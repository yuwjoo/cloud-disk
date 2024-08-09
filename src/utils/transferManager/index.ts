import { ConcurrentTask } from './utils/concurrentTask';
import request from '../request';
import { getFileHash } from '../utils';
import type { Task } from './utils/concurrentTask/task';
import axios, {
  type AxiosInstance,
  type AxiosProgressEvent,
  type AxiosRequestConfig,
  type CancelTokenSource
} from 'axios';

type Options = {
  uploadPath: string;
  uploadName: string;
  file: File;
  onProgress?: (progress: number) => void;
  onChange?: (status: string) => void;
};

const concurrentTask = new ConcurrentTask({ limit: 6 });

class MultipartRequest {
  #awaitQueue: { task: Task; cancel: CancelTokenSource['cancel'] }[] = []; // 等待队列
  #concurrentTask: ConcurrentTask; // 并发对象实例

  constructor(concurrentTask: ConcurrentTask) {
    this.#concurrentTask = concurrentTask;
  }

  add(request: AxiosInstance, config: AxiosRequestConfig): Task {
    const { token, cancel } = axios.CancelToken.source();
    const task = this.#concurrentTask.push(request, { ...config, cancelToken: token });
    this.#awaitQueue.push({ task, cancel });
    return task;
  }

  clear() {
    this.#awaitQueue.forEach((config) => {
      this.#concurrentTask.deleteTask(config.task);
      config.cancel();
    });
    this.#awaitQueue = [];
  }
}

class UploadTask {
  #status: 'pending' | 'upload' | 'pause' | 'success' | 'fail' | 'cancel' = 'pending';
  #progress: number = 0;
  #options: Options;
  #result: any;
  #uploadUrl: string | undefined;
  #multipartRequest: MultipartRequest;

  get status() {
    return this.#status;
  }

  get progress() {
    return this.#progress;
  }

  get result() {
    return this.#result;
  }

  constructor(options: Options) {
    this.#options = options;
    this.#multipartRequest = new MultipartRequest(concurrentTask);
  }

  async #checkHash() {
    try {
      const res = await this.#multipartRequest.add(request, {
        url: '/fileSystem/createFile',
        method: 'post',
        data: {
          folderPath: this.#options.uploadPath,
          fileName: this.#options.uploadName,
          fileHash: await getFileHash(this.#options.file),
          fileSize: this.#options.file.size
        }
      });

      if (res.data.data.uploadUrl) {
        this.#uploadUrl = res.data.data.uploadUrl;
        this.#uploadFile();
      } else {
        this.#status = 'success';
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        this.#status = 'cancel';
      } else {
        this.#status = 'fail';
      }
    }
  }

  async #uploadFile() {
    try {
      await this.#multipartRequest.add(request, {
        url: this.#uploadUrl,
        method: 'put',
        data: this.#options.file,
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (progressEvent.total) {
            this.#progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          }
        }
      });
      this.#status = 'success';
    } catch (err) {
      if (axios.isCancel(err)) {
        this.#status = 'cancel';
      } else {
        this.#status = 'fail';
      }
    }
  }

  /**
   * @description: 开始
   */
  async start() {
    this.#status = 'upload';
    if (!this.#uploadUrl) {
      this.#checkHash();
    } else {
      this.#uploadFile();
    }
  }

  /**
   * @description: 暂停
   */
  pause() {
    this.#status = 'pause';
    this.#multipartRequest.clear();
  }

  /**
   * @description: 取消
   */
  cancel() {
    this.#status = 'cancel';
    this.#multipartRequest.clear();
  }
}

function main() {
  const uploadTask = new UploadTask({
    uploadPath: '/utils/test',
    uploadName: 'test.jpg',
    file: new File([], ''),
    onProgress: (progress) => {
      console.log(progress);
    },
    onChange: (status) => {
      console.log(status);
    }
  });
  uploadTask.start();
}

main();
