import type { Ref } from 'vue';
import { ConcurrentTask } from './utils/concurrentTask';
import request from '../request';
import { getFileHash } from '../utils';
import type { Task } from './utils/concurrentTask/Task';
import axios, { type AxiosProgressEvent, type CancelTokenSource } from 'axios';

// 上传管理： 上传文件，暂停，继续，删除, 排序
// 下载管理： 下载文件，暂停，继续，删除, 排序

type Options = {
  uploadPath: string;
  uploadName: string;
  file: File;
  onProgress?: (progress: number) => void;
  onStatus?: (status: string) => void;
};

const concurrentTask = new ConcurrentTask(6);

class TransferTask {
  #status: 'await' | 'run' | 'pause' | 'success' | 'fail' | 'cancel' = 'await';
  #progress: number = 0; // 上传进度
  #options: Options;
  #step: number = 0;
  #requestList: { task: Task; cancelTokenSource: CancelTokenSource }[] = [];
  #response: any;
  #uploadUrl: string | undefined;

  get status() {
    return this.#status;
  }

  get progress() {
    return this.#progress;
  }

  get response() {
    return this.#response;
  }

  constructor(options: Options) {
    this.#options = options;
  }

  async createFile() {
    const cancelTokenSource = axios.CancelToken.source();
    const task = concurrentTask.pushTask(request, {
      url: '/fileSystem/createFile',
      method: 'post',
      data: {
        folderPath: this.#options.uploadPath,
        fileName: this.#options.uploadName,
        fileHash: await getFileHash(this.#options.file),
        fileSize: this.#options.file.size
      },
      cancelToken: cancelTokenSource.token
    });
    const requestItem = { task, cancelTokenSource };
    this.#requestList.push(requestItem);
    return task
      .then((res) => {
        if (res.data.done) {
          this.#status = 'success';
          this.#response = res.data.fileData;
          this.#progress = 100;
        } else {
          this.#uploadUrl = res.data.uploadUrl;
          this.#step = 1;
        }
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          this.#status = 'cancel';
        } else {
          this.#status = 'fail';
        }
      })
      .finally(() => {
        this.#requestList.splice(this.#requestList.indexOf(requestItem), 1);
      });
  }

  async uploadFile() {
    const cancelTokenSource = axios.CancelToken.source();
    const task = concurrentTask.pushTask(request, {
      url: this.#uploadUrl,
      method: 'put',
      data: this.#options.file,
      cancelToken: cancelTokenSource.token,
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (progressEvent.total) {
          this.#progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        }
      }
    });
    const requestItem = { task, cancelTokenSource };
    this.#requestList.push(requestItem);
    return task
      .then((res) => {
        this.#status = 'success';
        this.#response = res.data.fileData;
        this.#progress = 100;
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          this.#status = 'cancel';
        } else {
          this.#status = 'fail';
        }
      })
      .finally(() => {
        this.#requestList.splice(this.#requestList.indexOf(requestItem), 1);
      });
  }

  /**
   * @description: 开始
   */
  async start() {
    if (this.status !== 'await' && this.status !== 'pause') return;
    this.#status = 'run';
    if (this.#step === 0) {
      await this.createFile();
    }
    if (this.#step === 1) {
      await this.uploadFile();
    }
  }

  /**
   * @description: 暂停
   */
  pause() {
    this.#status = 'pause';
    this.#requestList.forEach((requestItem) => {
      concurrentTask.deleteTask(requestItem.task);
      requestItem.cancelTokenSource.cancel();
    });
    this.#requestList = [];
    this.#progress = 0;
  }

  /**
   * @description: 取消
   */
  cancel() {
    this.#status = 'cancel';
    this.#requestList = [];
    this.#progress = 0;
  }
}

class FileTransferManager<T extends TransferTask> {
  transferTaskList: Ref<T[]> = ref([]); // 传输任务列表
  awaitQueue: T[] = []; // 等待队列
  runtimePool: Set<T> = new Set(); // 运行池

  constructor() {}

  addUploadTask(uploadPath: string, uploadName: string, file: File) {}

  /**
   * @description: 添加传输任务
   */
  addTransferTask(transferTask: T, unshift?: boolean) {
    this.transferTaskList.value.push(transferTask);
    if (unshift) {
      this.awaitQueue.unshift(transferTask);
    } else {
      this.awaitQueue.push(transferTask);
    }
  }
}

function main() {
  const uploadTask = new TransferTask({
    uploadPath: '/utils/test',
    uploadName: 'test.jpg',
    file: new File([], ''),
    onProgress: (progress) => {
      console.log(progress);
    },
    onStatus: (status) => {
      console.log(status);
    }
  });
  uploadTask.start();
}
