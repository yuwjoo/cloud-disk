import request from '@/utils/request';
import { AxiosWrapper } from '../axiosWrapper/AxiosWrapper';
import type { FileAttribute } from '../fileAttribute/FileAttribute';
import { TaskExecutor } from '../taskExecutor/TaskExecutor';
import axios, { type AxiosProgressEvent } from 'axios';

export type SimpleUploadOptions = {
  fileAttribute: FileAttribute;
  onSuccess?: (response: any) => void;
  onFail?: () => void;
  onProgress?: (progress: number) => void;
};

const MAX_TASK_SIZE = 6; // 最大并发任务数

export class SimpleUpload {
  uploadUrl?: string; // 上传url
  expire?: number; // 上传url过期时间戳
  progress: number = 0; // 上传进度
  response?: any; // 响应数据
  paused: boolean = true; // 暂停中
  fileAttribute: FileAttribute; // 文件属性
  taskExecutor: TaskExecutor = new TaskExecutor({ maxExecNum: MAX_TASK_SIZE }); // 任务执行器
  onSuccess?: (response: any) => void; // 成功回调
  onFail?: () => void; // 失败回调
  onProgress?: (progress: number) => void; // 进度回调

  constructor(options: SimpleUploadOptions) {
    this.fileAttribute = options.fileAttribute;
    this.onSuccess = options.onSuccess;
    this.onFail = options.onFail;
    this.onProgress = options.onProgress;
  }

  /**
   * @description: 开始
   * @return {Promise<any>} promise
   */
  async start(): Promise<any> {
    this.paused = false;
    try {
      await this.getUploadUrl();
      if (this.paused) return;
      await this.uploadFile();
      if (this.paused) return;
      this.onSuccess?.(this.response);
      return this.response;
    } catch (err) {
      if (!this.paused) this.onFail?.();
      throw err;
    }
  }

  /**
   * @description: 暂停
   */
  pause() {
    this.paused = true;
    this.taskExecutor.clearTask();
  }

  /**
   * @description: 获取上传url
   * @return {Promise<void>} promise
   */
  getUploadUrl(): Promise<void> {
    if (this.uploadUrl && (!this.expire || Date.now() < this.expire)) return Promise.resolve();
    const axiosWrapper = new AxiosWrapper({
      axios: request,
      configs: {
        url: 'oss/getUploadUrl',
        method: 'get',
        params: {
          fileHash: this.fileAttribute.hash,
          fileName: this.fileAttribute.name,
          mimeType: this.fileAttribute.type
        }
      },
      options: {
        maxRetryCount: 3
      }
    });
    this.taskExecutor.addTask({
      onExecutor: async () => {
        const res = await axiosWrapper.send();
        this.uploadUrl = res.data.uploadUrl;
        this.expire = res.data.expire;
      },
      onRemove: () => {
        axiosWrapper.cancel();
      }
    });
    return TaskExecutor.all(this.taskExecutor);
  }

  /**
   * @description: 上传文件
   * @return {Promise<void>} promise
   */
  uploadFile(): Promise<void> {
    if (this.response) return Promise.resolve();
    const axiosWrapper = new AxiosWrapper({
      axios: axios,
      configs: {
        url: this.uploadUrl,
        method: 'put',
        data: this.fileAttribute.file,
        headers: {
          'Content-Type': this.fileAttribute.type,
          'x-oss-forbid-overwrite': true,
          'x-oss-object-acl': 'private',
          'x-oss-storage-class': 'Standard'
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          this.progress = (progressEvent.loaded / (progressEvent.total || 0)) * 100;
          this.onProgress?.(this.progress);
        }
      },
      options: {
        maxRetryCount: 3
      }
    });
    this.taskExecutor.addTask({
      onExecutor: async () => {
        const res = await axiosWrapper.send();
        this.response = res.data.data;
      },
      onRemove: () => {
        axiosWrapper.cancel();
      }
    });
    return TaskExecutor.all(this.taskExecutor);
  }
}
