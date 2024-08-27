/*
 * @FileName: 简单上传
 * @FilePath: \cloud-disk\src\utils\uploadManager\hooks\simpleUpload.ts
 * @Author: YH
 * @Date: 2024-08-23 11:48:43
 * @LastEditors: YH
 * @LastEditTime: 2024-08-27 16:57:34
 * @Description:
 */
import axios, { type AxiosProgressEvent } from 'axios';
import { TaskExecutor } from '../class/TaskExecutor';

export type SimpleUploadOptions = {
  file: File; // 文件
  onSuccess?: (value: any) => void; // 成功回调
  onFail?: (reason: any) => void; // 失败回调
};

export type SimpleUploadUpload = {
  url: string; // 上传地址
  expire: number; // 过期时间戳
};

export function useSimpleUpload(options: SimpleUploadOptions) {
  const progress = ref<number>(0); // 上传进度
  const response = ref<any>(); // 响应结果
  let uploadUrl: string; // 上传url
  let expire: number; // 上传url过期时间戳
  let taskExecutor: TaskExecutor; // 上传任务执行器

  /**
   * @description: 开始
   */
  async function start() {
    progress.value = response.value ? 100 : 0;

    if (progress.value === 100) {
      options.onSuccess?.(response.value);
      return;
    }

    try {
      if (!uploadUrl || (expire && Date.now() >= expire)) {
        taskExecutor = getUploadUrl();
        await taskExecutor.start().promise;
      }
      taskExecutor = uploadFile();
      await taskExecutor.start().promise;
      options.onSuccess?.(response.value);
    } catch (err) {
      if (err === TaskExecutor.CANCELLED) return;
      options.onFail?.(err);
    }
  }

  /**
   * @description: 重新开始
   */
  function restart() {
    progress.value = 0;
    response.value = '';
    uploadUrl = '';
    expire = 0;
    start();
  }

  /**
   * @description: 暂停
   */
  function pause() {
    taskExecutor.cancel();
  }

  /**
   * @description: 获取上传url
   * @return {TaskExecutor} 任务执行器
   */
  function getUploadUrl(): TaskExecutor {
    const { token, cancel } = axios.CancelToken.source();

    return new TaskExecutor(async (resolve, reject) => {
      try {
        const res = await axios({
          url: 'oss/getUploadUrl',
          method: 'get',
          params: {
            fileHash: (options.file as any).hash,
            fileName: options.file.name,
            mimeType: options.file.type || 'application/octet-stream'
          },
          cancelToken: token
        });
        uploadUrl = res.data.uploadUrl;
        expire = res.data.expire;
        resolve();
      } catch (err) {
        reject(axios.isCancel(err) ? TaskExecutor.CANCELLED : err);
      }
    }).configs({ onCancel: cancel });
  }

  /**
   * @description: 上传文件
   * @return {TaskExecutor} 任务执行器
   */
  function uploadFile(): TaskExecutor {
    const { token, cancel } = axios.CancelToken.source();

    return new TaskExecutor(async (resolve, reject) => {
      try {
        const res = await axios({
          url: uploadUrl,
          method: 'put',
          data: options.file,
          headers: {
            'Content-Type': options.file.type || 'application/octet-stream',
            'x-oss-forbid-overwrite': true
          },
          cancelToken: token,
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            progress.value = (progressEvent.loaded / (progressEvent.total || 0)) * 100;
          }
        });
        response.value = res.data;
        resolve();
      } catch (err) {
        reject(axios.isCancel(err) ? TaskExecutor.CANCELLED : err);
      }
    }).configs({ onCancel: cancel });
  }

  return { progress, response, start, restart, pause };
}
