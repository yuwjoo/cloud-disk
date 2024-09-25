/*
 * @FileName: 分片上传类
 * @FilePath: \cloud-disk\src\utils\uploadManager\multipartUpload\MultipartUpload.ts
 * @Author: YH
 * @Date: 2024-08-29 13:36:34
 * @LastEditors: YH
 * @LastEditTime: 2024-09-25 17:31:35
 * @Description:
 */
import { useRequest } from '@/library/axios';
import { AxiosWrapper } from '../axiosWrapper/AxiosWrapper';
import { Part } from './Part';
import type { FileAttribute } from '../fileAttribute/FileAttribute';
import axios from 'axios';
import { TaskExecutorPool } from '../taskExecutorPool/TaskExecutorPool';
import { TaskExecutor } from '../taskExecutorPool/TaskExecutor';

export type MultipartUploadOptions = {
  fileAttribute: FileAttribute;
  onSuccess?: (response: any) => void;
  onFail?: () => void;
  onProgress?: (progress: number) => void;
};

const MAX_TASK_SIZE = 6; // 最大并发任务数
const DEFAULT_PART_SIZE = 1024 * 1024 * 1; // 默认分片大小
const MAX_GET_PART_SIZE = 20; // 每次请求最多获取多少个分片的信息

export class MultipartUpload {
  uploadId?: string; // 上传id
  object?: string; // oss object
  partSize: number = DEFAULT_PART_SIZE; // 分片大小
  partList: Part[]; // 分片列表
  invalidPartList: Part[] = []; // 失效的分片列表
  progress: number = 0; // 上传进度
  response?: any; // 响应数据
  paused: boolean = true; // 暂停中
  fileAttribute: FileAttribute; // 文件属性
  taskExecutorPool: TaskExecutorPool = new TaskExecutorPool({ maxExecCount: MAX_TASK_SIZE }); // 任务执行池
  onSuccess?: (response: any) => void; // 成功回调
  onFail?: () => void; // 失败回调
  onProgress?: (progress: number) => void; // 进度回调

  // 获取分片总数
  get partTotal(): number {
    return Math.ceil(this.fileAttribute.size / this.partSize);
  }

  constructor(options: MultipartUploadOptions) {
    const createPart = (i: number) => new Part(i + 1, this.partSize, this.fileAttribute.file);
    this.fileAttribute = options.fileAttribute;
    this.onSuccess = options.onSuccess;
    this.onFail = options.onFail;
    this.onProgress = options.onProgress;
    this.partList = Array.from({ length: this.partTotal }, (_, i) => createPart(i));
  }

  /**
   * @description: 开始
   * @return {Promise<any>} promise
   */
  async start(data: any): Promise<any> {
    this.paused = false;
    try {
      this.uploadId = data.value;
      if (this.paused) return;
      await this.uploadMultipart();
      if (this.paused) return;
      await this.mergeMultipart();
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
    this.taskExecutorPool.clear();
  }

  /**
   * @description: 初始化分片
   * @return {Promise<any>} promise
   */
  initMultipart(): Promise<any> {
    if (this.uploadId) return Promise.resolve();
    const axiosWrapper = new AxiosWrapper({
      axios: useRequest as any,
      configs: {
        url: 'oss/getUploadId',
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
    const taskExecutor = new TaskExecutor({
      onExecutor: async () => {
        const res = await axiosWrapper.send();
        this.uploadId = res.data.uploadId;
        this.object = res.data.object;
      },
      onCancel: () => {
        axiosWrapper.cancel();
      }
    });
    this.taskExecutorPool.add(taskExecutor);
    return this.taskExecutorPool.all();
  }

  /**
   * @description: 获取分片
   * @param {Part} parts 分片列表
   */
  getMultiparts(parts: Part[]) {
    const axiosWrapper = new AxiosWrapper({
      axios: useRequest as any,
      configs: {
        url: '/api/upload/getMultiparts',
        method: 'post',
        data: {
          name: this.fileAttribute.name,
          hash: this.fileAttribute.hash,
          uploadId: this.uploadId,
          partNumbers: parts.map((part) => part.number)
        }
      },
      options: {
        maxRetryCount: 3
      }
    });
    const taskExecutor = new TaskExecutor({
      onExecutor: async () => {
        const res = await axiosWrapper.send();
        res.data.forEach((data: any) => {
          const part = Object.assign(this.partList[data.number - 1], {
            url: data.url,
            expire: data.expire
          });
          this.addPartTask(part);
        });
      },
      onCancel: () => {
        axiosWrapper.cancel();
      }
    });
    this.taskExecutorPool.add(taskExecutor);
  }

  /**
   * @description: 上传分片
   * @return {Promise<any>} promise
   */
  uploadMultipart(): Promise<any> {
    for (const part of this.partList) {
      if (part.etag) {
        continue; // 跳过已经上传完成的分片
      }
      if (part.isValid) {
        this.addPartTask(part);
      } else {
        this.invalidPartList.push(part);
      }
    }
    while (!this.taskExecutorPool.filled && this.invalidPartList.length) {
      this.getMultiparts(this.invalidPartList.splice(0, MAX_GET_PART_SIZE));
    }
    return this.taskExecutorPool.all();
  }

  /**
   * @description: 添加分片任务
   * @param {Part} part 分片
   */
  addPartTask(part: Part) {
    const axiosWrapper = new AxiosWrapper({
      axios: axios,
      configs: {
        url: part.url,
        method: 'put',
        data: part.blob,
        headers: {
          'Content-Type': 'application/octet-stream'
        }
      },
      options: {
        maxRetryCount: 3
      }
    });
    const taskExecutor = new TaskExecutor({
      onExecutor: async () => {
        if (part.isValid) {
          // 正常上传分片
          part.etag = (await axiosWrapper.send()).headers['etag'];
          this.progress += 100 / this.partTotal;
          this.onProgress?.(this.progress);
        } else {
          // 分片已经失效
          this.invalidPartList.push(part);
        }

        // 无等待的任务 并且 失效列表有数据时，重新获取失效分片
        if (this.taskExecutorPool.awaitCount === 0 && this.invalidPartList.length) {
          this.getMultiparts(this.invalidPartList.splice(0, MAX_GET_PART_SIZE));
        }
      },
      onCancel: () => {
        axiosWrapper.cancel();
      }
    });
    this.taskExecutorPool.add(taskExecutor);
  }

  /**
   * @description: 合并分片
   * @return {Promise<any>} promise
   */
  mergeMultipart(): Promise<any> {
    if (this.response) return Promise.resolve();
    const axiosWrapper = new AxiosWrapper({
      axios: useRequest,
      configs: {
        url: '/api/upload/mergeMultipart',
        method: 'post',
        data: {
          name: this.fileAttribute.name,
          hash: this.fileAttribute.hash,
          uploadId: this.uploadId,
          parts: this.partList.map(({ number, etag }) => ({ number, etag }))
        }
      },
      options: {
        maxRetryCount: 3
      }
    });
    const taskExecutor = new TaskExecutor({
      onExecutor: async () => {
        const res = await axiosWrapper.send();
        this.response = res.data;
      },
      onCancel: () => {
        axiosWrapper.cancel();
      }
    });
    this.taskExecutorPool.add(taskExecutor);
    return this.taskExecutorPool.all();
  }
}
