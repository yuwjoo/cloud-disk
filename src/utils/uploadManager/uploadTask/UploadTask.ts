/*
 * @FileName: 上传任务类
 * @FilePath: \cloud-disk\src\utils\uploadManager\uploadTask\UploadTask.ts
 * @Author: YH
 * @Date: 2024-08-30 14:17:34
 * @LastEditors: YH
 * @LastEditTime: 2024-09-26 11:18:03
 * @Description:
 */
import { useRequest } from '@/library/axios';
import { FileAttribute } from '../fileAttribute/FileAttribute';
import { MultipartUpload } from '../multipartUpload/MultipartUpload';
import { SimpleUpload } from '../simpleUpload/SimpleUpload';
import { AxiosWrapper } from '../axiosWrapper/AxiosWrapper';
import { TaskExecutorPool } from '../taskExecutorPool/TaskExecutorPool';
import { TaskExecutor } from '../taskExecutorPool/TaskExecutor';

export type UploadTaskOptions = {
  file: File;
  uploadPath: string;
  uploadName: string;
  onInitialize?: () => void;
  onWaiting?: () => void;
  onUpload?: () => void;
  onProgress?: (progress: number) => void;
  onPause?: () => void;
  onCancel?: () => void;
  onSuccess?: (response: any) => void;
  onFail?: () => void;
};

export type UploadTaskStatus =
  | 'initialize'
  | 'waiting'
  | 'pausing'
  | 'uploading'
  | 'success'
  | 'fail'
  | 'cancel';

const MIN_MULTIPART_SIZE = 1024 * 1024 * 10; // 启用分片上传的最小文件大小
const MAX_UPLOAD_TASK_NUM = 1; // 最大同时执行的上传任务数

export class UploadTask {
  static taskExecutorPool = new TaskExecutorPool({ maxExecCount: MAX_UPLOAD_TASK_NUM }); // 任务执行池

  status: UploadTaskStatus = 'pausing'; // 状态: initialize: 初始化, waiting: 等待中, pausing: 暂停中, uploading: 上传中, success: 成功, fail: 失败, cancel: 取消
  progress: number = 0; // 上传进度
  response?: any; // 响应数据
  fileAttribute: FileAttribute; // 文件属性
  queueTask?: TaskExecutor; // 队列中的任务
  simpleUpload: SimpleUpload; // 简单上传控制器
  multipartUpload: MultipartUpload; // 分片上传控制器
  taskExecutorPool: TaskExecutorPool = new TaskExecutorPool({ maxExecCount: 1 }); // 任务执行池
  onInitialize?: () => void; // 初始化回调
  onWaiting?: () => void; // 等待中回调
  onUpload?: () => void; // 上传回调
  onProgress?: (progress: number) => void; // 进度回调
  onPause?: () => void; // 暂停回调
  onCancel?: () => void; // 取消回调
  onSuccess?: (response: any) => void; // 成功回调
  onFail?: () => void; // 失败回调

  constructor(options: UploadTaskOptions) {
    this.fileAttribute = new FileAttribute(options.file, {
      uploadName: options.uploadName,
      uploadPath: options.uploadPath
    });
    this.onInitialize = options.onInitialize;
    this.onWaiting = options.onWaiting;
    this.onUpload = options.onUpload;
    this.onProgress = options.onProgress;
    this.onPause = options.onPause;
    this.onCancel = options.onCancel;
    this.onSuccess = options.onSuccess;
    this.onFail = options.onFail;
    this.multipartUpload = new MultipartUpload({
      fileAttribute: this.fileAttribute,
      onProgress: (num) => {
        this.progress = num;
        this.onProgress?.(num);
      }
    });
    this.simpleUpload = new SimpleUpload({
      fileAttribute: this.fileAttribute,
      onProgress: (num) => {
        this.progress = num;
        this.onProgress?.(num);
      }
    });
  }

  /**
   * @description: 开始
   */
  async start() {
    try {
      this.status = 'initialize';
      this.onInitialize?.();
      await this.getFileHash();
      this.status = 'waiting';
      this.onWaiting?.();
      this.queueTask = new TaskExecutor({
        onExecutor: async () => {
          this.status = 'uploading';
          this.onUpload?.();
          const data = await this.verifyFile();
          let ossFileId;
          if (data.mode === 'second') {
            ossFileId = data.value;
          } else {
            ossFileId = await this.uploadFile(data);
          }
          return await this.createFile(ossFileId);
        },
        onCancel: () => {
          this.taskExecutorPool.clear();
        }
      });
      UploadTask.taskExecutorPool.add(this.queueTask);
      this.response = await this.queueTask.promise;
      this.status = 'success';
      this.progress = 100;
      this.onProgress?.(100);
      this.onSuccess?.(this.response);
    } catch (err) {
      if (this.status === 'pausing' || this.status === 'cancel') return;
      this.status = 'fail';
      this.onFail?.();
    }
  }

  /**
   * @description: 暂停
   */
  pause() {
    if (this.queueTask) UploadTask.taskExecutorPool.delete(this.queueTask);
    this.status = 'pausing';
    this.onPause?.();
  }

  /**
   * @description: 取消
   */
  cancel() {
    this.progress = 0;
    this.response = '';
    this.multipartUpload = new MultipartUpload({
      fileAttribute: this.fileAttribute,
      onProgress: (num) => {
        this.progress = num;
        this.onProgress?.(num);
      }
    });
    this.simpleUpload = new SimpleUpload({
      fileAttribute: this.fileAttribute,
      onProgress: (num) => {
        this.progress = num;
        this.onProgress?.(num);
      }
    });
    if (this.queueTask) UploadTask.taskExecutorPool.delete(this.queueTask);
    this.status = 'cancel';
    this.onCancel?.();
  }

  /**
   * @description: 获取文件hash
   * @return {Promise<void>} promise
   */
  getFileHash(): Promise<void> {
    if (this.fileAttribute.hash) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const workerPath = new URL('../workers/fileHashWorker.ts', import.meta.url);
      const worker = new Worker(workerPath, { type: 'module' });
      worker.postMessage({ targetFile: this.fileAttribute.file });
      worker.onmessage = (event) => {
        this.fileAttribute.hash = event.data;
        resolve();
      };
      worker.onerror = (err) => {
        reject(err);
      };
    });
  }

  /**
   * @description: 校验文件
   * @return {Promise<any>} promise
   */
  verifyFile(): Promise<any> {
    const axiosWrapper = new AxiosWrapper({
      axios: useRequest as any,
      configs: {
        url: '/api/upload/preCheckFile',
        method: 'get',
        params: {
          name: this.fileAttribute.name,
          hash: this.fileAttribute.hash,
          size: this.fileAttribute.size,
          mimeType: this.fileAttribute.type,
          multipart: this.fileAttribute.size > MIN_MULTIPART_SIZE
        }
      },
      options: {
        maxRetryCount: 3
      }
    });
    const taskExecutor = new TaskExecutor({
      onExecutor: async () => {
        return (await axiosWrapper.send()).data;
      },
      onCancel: () => {
        axiosWrapper.cancel();
      }
    });
    this.taskExecutorPool.add(taskExecutor);
    return taskExecutor.promise;
  }

  /**
   * @description: 上传文件
   * @return {Promise<string>} promise
   */
  uploadFile(data: any): Promise<string> {
    const taskExecutor = new TaskExecutor({
      onExecutor: () => {
        if (data.mode === 'multipart') {
          return this.multipartUpload.start(data);
        } else {
          return this.simpleUpload.start(data);
        }
      },
      onCancel: () => {
        if (data.mode === 'multipart') {
          this.multipartUpload.pause();
        } else {
          this.simpleUpload.pause();
        }
      }
    });
    this.taskExecutorPool.add(taskExecutor);
    return taskExecutor.promise;
  }

  /**
   * @description: 创建文件
   * @param {string} resourceToken 资源token
   * @return {Promise<void>} promise
   */
  createFile(resourceToken: string): Promise<void> {
    const axiosWrapper = new AxiosWrapper({
      axios: useRequest as any,
      configs: {
        url: '/api/storage/create',
        method: 'post',
        data: {
          parent: this.fileAttribute.uploadPath, // 父级路径
          name: this.fileAttribute.name, // 名称
          isDirectory: false, // 是否目录
          ossFileId: resourceToken // OSS文件ID
        }
      },
      options: {
        maxRetryCount: 0
      }
    });
    const taskExecutor = new TaskExecutor({
      onExecutor: () => {
        return axiosWrapper.send();
      },
      onCancel: () => {
        axiosWrapper.cancel();
      }
    });
    this.taskExecutorPool.add(taskExecutor);
    return taskExecutor.promise;
  }
}
