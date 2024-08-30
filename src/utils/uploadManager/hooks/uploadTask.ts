/*
 * @FileName: 上传任务
 * @FilePath: \cloud-disk\src\utils\uploadManager\hooks\uploadTask.ts
 * @Author: YH
 * @Date: 2024-08-23 14:18:12
 * @LastEditors: YH
 * @LastEditTime: 2024-08-29 09:57:02
 * @Description:
 */
import request from '@/utils/request';
import type { PostMessageData } from '../workers/fileHashWorker';
import { useMultipartUpload } from './multipartUpload';
import { useSimpleUpload } from './simpleUpload';
import type { ResponseBody } from 'types/src/utils/request';

export type GetFileHashParams = {
  file: File;
};

export type GetFileHashReturn = PostMessageData;

export type GetResourceTokenParams = {
  fileHash: string;
};

export type GetResourceTokenReturn = ResponseBody<string>;

export type CreateFileParams = {
  folderPath: string;
  fileName: string;
  resourceToken: string;
};

export type CreateFileReturn = {};

export type CreateUploadTaskOptions = {
  file: File;
  uploadPath: string;
  uploadName: string;
};

export type UploadTaskStatus =
  | 'init'
  | 'ready'
  | 'upload'
  | 'pause'
  | 'success'
  | 'fail'
  | 'cancel'; // 状态: init: 初始化, ready: 就绪, upload: 上传, pause: 暂停, success: 成功, fail: 失败, cancel: 取消

export type UploadTaskUploadType = 'fast' | 'simple' | 'multipart'; // 上传类型：fast: 秒传，simple: 简单上传，multipart: 分片上传

const MIN_MULTIPART_SIZE = 1024 * 1024 * 8; // 启用分片上传的文件最小大小
const PART_SIZE = 1024 * 1024 * 1; // 分片大小

/**
 * @description: 获取文件hash
 * @param {GetFileHashParams} params 参数
 * @return {Promise<GetFileHashReturn>} 文件hash
 */
function getFileHash(params: GetFileHashParams): Promise<GetFileHashReturn> {
  return new Promise((resolve, reject) => {
    const workerPath = new URL('../workers/fileHashWorker.ts', import.meta.url);
    const worker = new Worker(workerPath, { type: 'module' });

    worker.postMessage({ targetFile: params.file });
    worker.onmessage = (event) => resolve(event.data);
    worker.onerror = (err) => reject(err);
  });
}

/**
 * @description: 获取资源token
 * @param {CreateFileParams} params 参数
 * @return {Promise<GetResourceTokenReturn>} 响应
 */
function getResourceToken(params: GetResourceTokenParams): Promise<GetResourceTokenReturn> {
  return request({
    url: '/fileSystem/getResourceToken',
    method: 'get',
    params
  });
}

/**
 * @description: 创建文件
 * @param {CreateFileParams} params 参数
 * @return {Promise<CreateFileReturn>} 响应
 */
function createFile(params: CreateFileParams): Promise<CreateFileReturn> {
  return request({
    url: '/fileSystem/createFile',
    method: 'post',
    data: params
  });
}

/**
 * @description: 创建上传任务
 * @param {CreateUploadTaskOptions} options 配置
 */
export function createUploadTask(options: CreateUploadTaskOptions) {
  const status = ref<UploadTaskStatus>('pause'); // 状态
  const fileHash = ref<string>(); // 文件hash
  const response = ref<any>(); // 响应结果
  const uploadType = ref<UploadTaskUploadType>('fast'); // 上传类型
  const progress = computed(() => {
    if (uploadType.value === 'fast') {
      return status.value === 'success' ? 100 : 0;
    } else if (uploadType.value === 'simple') {
      return simpleUpload.progress.value;
    } else {
      return multipartUpload.progress.value;
    }
  }); // 上传进度
  const simpleUpload = useSimpleUpload({
    file: options.file,
    onSuccess,
    onFail
  }); // 简单上传
  const multipartUpload = useMultipartUpload({
    file: options.file,
    partSize: PART_SIZE,
    onSuccess,
    onFail
  }); // 分片上传

  /**
   * @description: 初始化
   */
  async function init() {
    status.value = 'init';
    try {
      fileHash.value = fileHash.value || (await getFileHash({ file: options.file })); // 获取文件hash
      (options.file as any).hash = fileHash.value;
      if (status.value === 'init') status.value = 'ready';
    } catch (err) {
      if (status.value === 'init') status.value = 'fail';
    }
  }

  /**
   * @description: 准备
   */
  function ready() {
    if (status.value !== 'pause') return;
    init();
  }

  /**
   * @description: 开始
   */
  async function start() {
    if (status.value !== 'ready') return;
    let resourceToken: string | undefined;

    status.value = 'upload';
    try {
      resourceToken = (await getResourceToken({ fileHash: fileHash.value! })).data; // 获取资源token

      if (resourceToken) {
        // 秒传
        uploadType.value = 'fast';
        onSuccess(resourceToken);
      } else if (options.file.size <= MIN_MULTIPART_SIZE) {
        // 简单上传
        uploadType.value = 'simple';
        simpleUpload.start();
      } else {
        // 分片上传
        uploadType.value = 'multipart';
        multipartUpload.start();
      }
    } catch (err) {
      status.value = 'fail';
    }
  }

  /**
   * @description: 暂停
   */
  function pause() {
    if (status.value !== 'upload') return;
    status.value = 'pause';
    if (uploadType.value === 'simple') {
      simpleUpload.pause();
    } else {
      multipartUpload.pause();
    }
  }

  /**
   * @description: 取消
   */
  function cancel() {
    if (status.value === 'success' || status.value === 'fail') return;
    status.value = 'cancel';
    if (uploadType.value === 'simple') {
      simpleUpload.pause();
    } else {
      multipartUpload.pause();
    }
    response.value = '';
    uploadType.value = 'fast';
  }

  /**
   * @description: 上传成功回调
   */
  async function onSuccess(resourceToken: string) {
    response.value = await createFile({
      folderPath: options.uploadPath,
      fileName: options.uploadName,
      resourceToken: resourceToken
    });
    status.value = 'success';
  }

  /**
   * @description: 上传失败回调
   */
  function onFail() {
    status.value = 'fail';
  }

  return reactive({
    file: options.file,
    status,
    fileHash,
    response,
    uploadType,
    progress: computed(() => Math.floor(progress.value)),
    ready,
    start,
    pause,
    cancel
  });
}
