/*
 * @FileName: 分片上传
 * @FilePath: \cloud-disk\src\utils\uploadManager\hooks\multipartUpload.ts
 * @Author: YH
 * @Date: 2024-08-13 16:50:00
 * @LastEditors: YH
 * @LastEditTime: 2024-08-27 17:43:45
 * @Description:
 */
import request from '@/utils/request';
import axios from 'axios';
import { TaskExecutor } from '../class/TaskExecutor';
import { TaskExecutorManager } from '../class/TaskExecutorManager';

export type MultipartUploadOptions = {
  file: File; // 文件
  partSize?: number; // 分片大小 (btye)
  defaultPartList?: MultipartUploadPart[]; // 默认分片列表
  onSuccess?: (value: any) => void; // 成功回调
  onFail?: (reason: any) => void; // 失败回调
};

export type MultipartUploadPart = {
  number: number; // 下标
  url?: string; // 上传地址
  expire?: number; // 过期时间戳
  ETag?: string; // ETag
};

const MAX_TASK_SIZE = 6; // 最大并发任务数
const DEFAULT_PART_SIZE = 1024 * 1024 * 1; // 默认分片大小
const MAX_GET_PART_SIZE = 20; // 每次请求最多获取多少个分片的信息

export function useMultipartUpload(options: MultipartUploadOptions) {
  const { file, partSize = DEFAULT_PART_SIZE, defaultPartList = [] } = options;
  const partTotal = Math.ceil(file.size / partSize); // 分片总数
  let uploadId: string = ''; // 上传id
  let object: string = ''; // object名称
  const progress = ref<number>(0); // 上传进度
  const response = ref<any>(); // 响应结果
  let partList: MultipartUploadPart[] = []; // 完整的分片列表
  let fetchList: MultipartUploadPart[] = []; // 需要重新获取的分片列表
  const taskExecutorManager = new TaskExecutorManager({ limit: MAX_TASK_SIZE }); // 执行器管理

  init();

  /**
   * @description: 初始化
   */
  function init() {
    const list: MultipartUploadPart[] = Array.from({ length: partTotal }, (_, i) => {
      return { number: i + 1 };
    });

    defaultPartList.forEach((part) => (list[part.number - 1] = part));
    taskExecutorManager.clear();

    for (const part of list) {
      if (part.ETag) continue; // 跳过已经上传完成的分片
      taskExecutorManager.add(uploadPart(part));
    }

    uploadId = '';
    progress.value = 0;
    response.value = '';
    partList = list;
    fetchList = [];
  }

  /**
   * @description: 开始
   */
  async function start() {
    progress.value = partList.reduce((num, part) => (part.ETag ? num + 100 / partTotal : num), 0);

    try {
      uploadId || (await initPartUpload().start().promise);
      await taskExecutorManager.start({
        onFail: (reason) => {
          taskExecutorManager.pause();
          options.onFail?.(reason);
        }
      });
      response.value || (await completePartUpload().start().promise);
      options.onSuccess?.(response.value);
    } catch (err) {
      /* empty */
    }
  }

  /**
   * @description: 重新开始
   */
  function restart() {
    init();
    start();
  }

  /**
   * @description: 暂停
   */
  function pause() {
    taskExecutorManager.pause();
  }

  /**
   * @description: 初始化分片上传
   * @return {TaskExecutor} 任务执行器
   */
  function initPartUpload(): TaskExecutor {
    const { token, cancel } = axios.CancelToken.source();

    return new TaskExecutor(async (resolve, reject) => {
      try {
        const res = await request({
          url: 'oss/getUploadId',
          method: 'get',
          params: {
            fileHash: (options.file as any).hash,
            fileName: options.file.name,
            mimeType: options.file.type
          },
          cancelToken: token
        });
        uploadId = res.data.uploadId;
        object = res.data.object;
        resolve();
      } catch (err) {
        reject(axios.isCancel(err) ? TaskExecutor.CANCELLED : err);
      }
    }).configs({ onCancel: cancel, retryCount: 3 });
  }

  /**
   * @description: 上传分片
   * @param {MultipartUploadPart} part 分片
   * @return {TaskExecutor} 任务执行器
   */
  function uploadPart(part: MultipartUploadPart): TaskExecutor {
    const { token, cancel } = axios.CancelToken.source();

    return new TaskExecutor(async (resolve, reject) => {
      // 没有上传地址或者已经过期
      if (!part.url || (part.expire && Date.now() >= part.expire)) {
        fetchList.push(part);
        if (fetchList.length > MAX_GET_PART_SIZE || taskExecutorManager.awaitingCount === 0) {
          getParts(fetchList.splice(0, MAX_GET_PART_SIZE));
        }
        reject(TaskExecutor.CANCELLED);
        return;
      }

      // 开始上传分片数据
      try {
        const res = await axios({
          url: part.url,
          method: 'put',
          data: file.slice((part.number - 1) * partSize, part.number * partSize),
          headers: {
            'Content-Type': file.type || 'application/octet-stream',
            'x-oss-forbid-overwrite': true
          },
          cancelToken: token
        });
        part.ETag = res.headers['etag'];
        progress.value += 100 / partTotal;
        resolve();
      } catch (err) {
        reject(axios.isCancel(err) ? TaskExecutor.CANCELLED : err);
      }
    }).configs({ onCancel: cancel, retryCount: 3 });
  }

  /**
   * @description: 获取分片
   * @param {MultipartUploadPart[]} parts 分片列表
   * @return {TaskExecutor} 任务执行器
   */
  function getParts(parts: MultipartUploadPart[]): TaskExecutor {
    const { token, cancel } = axios.CancelToken.source();

    return new TaskExecutor(async (resolve, reject) => {
      try {
        const res = await request({
          url: '/oss/getMultiparts',
          method: 'post',
          data: {
            uploadId,
            object,
            partNumbers: parts.map((part) => part.number),
            mimeType: file.type || 'application/octet-stream'
          },
          cancelToken: token
        });
        res.data.forEach((item: Required<Omit<MultipartUploadPart, 'ETag'>>) => {
          partList[item.number - 1] = item;
          uploadPart(item);
        });
        resolve();
      } catch (err) {
        reject(axios.isCancel(err) ? TaskExecutor.CANCELLED : err);
      }
    }).configs({ onCancel: cancel, retryCount: 3 });
  }

  /**
   * @description: 完成分片上传
   * @return {TaskExecutor} 任务执行器
   */
  function completePartUpload(): TaskExecutor {
    const { token, cancel } = axios.CancelToken.source();
    const xml: string[] = [];

    xml.push('<CompleteMultipartUpload>');
    partList.forEach(({ number, ETag }: MultipartUploadPart) => {
      xml.push(
        `<Part> 
            <PartNumber>${number}</PartNumber>  
            <ETag>"${ETag}"</ETag> 
        </Part>`
      );
    });
    xml.push('</CompleteMultipartUpload>');

    return new TaskExecutor(async (resolve, reject) => {
      try {
        const res = await request({
          url: '/oss/completeMultipart',
          method: 'post',
          data: {
            uploadId,
            xmlData: xml.join('')
          },
          cancelToken: token
        });
        response.value = res.data;
        resolve();
      } catch (err) {
        reject(axios.isCancel(err) ? TaskExecutor.CANCELLED : err);
      }
    }).configs({ onCancel: cancel, retryCount: 3 });
  }

  return { progress, response, start, restart, pause };
}
