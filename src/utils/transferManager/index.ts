import { ConcurrentTask } from './utils/ConcurrentLimit';
import request from '../request';
import { getFileHash } from '../utils';
import type { Task } from './utils/ConcurrentLimit/task';
import axios, {
  type AxiosInstance,
  type AxiosProgressEvent,
  type AxiosRequestConfig,
  type CancelTokenSource
} from 'axios';
import { EventHelper } from './utils/eventHelper';

type UploadTaskOptions = {
  path: string;
  name: string;
  file: File;
};

type UploadTaskStatus =
  | 'init'
  | 'error'
  | 'ready'
  | 'play'
  | 'pause'
  | 'success'
  | 'fail'
  | 'cancel';

type UploadTaskStep = 'checking' | 'uploading' | 'creating';

type UploadTaskSimpleUploadParams = {
  uploadUrl: string;
};

type UploadTaskMultipartUploadParams = {
  uploadId: string;
  number: number;
  size: number;
  total: number;
  partSize: number;
  list: { url: string; partNumber: number; etag: string }[];
};

class MultipartRequest {
  #awaitQueue: { task: Task; cancel: CancelTokenSource['cancel'] }[] = []; // 等待队列
  #concurrentTask: ConcurrentTask = new ConcurrentTask({ limit: 6 }); // 并发对象实例

  /**
   * @description: 添加请求
   * @param {AxiosInstance} request 请求实例
   * @param {AxiosRequestConfig} config 请求配置
   * @return {Task} 任务实例
   */
  add(request: AxiosInstance, config: AxiosRequestConfig): Task {
    const { token, cancel } = axios.CancelToken.source();
    const task = this.#concurrentTask.push(request, { ...config, cancelToken: token });
    this.#awaitQueue.push({ task, cancel });
    return task;
  }

  /**
   * @description: 清除请求
   */
  clear() {
    this.#concurrentTask.clear();
    this.#awaitQueue.forEach((config) => config.cancel());
    this.#awaitQueue = [];
  }
}

class UploadTask extends EventHelper {
  #options: UploadTaskOptions; // 配置项
  #status: UploadTaskStatus = 'init'; // 状态: init: 初始化, error: 异常, ready: 就绪, play: 运行, pause: 暂停, success: 成功, fail: 失败, cancel: 取消
  #step: UploadTaskStep = 'checking'; // 步骤: checking: 校验文件, uploading: 上传文件, creating: 创建文件
  #progress: number = 0; // 上传进度
  #hash: string = ''; // 文件hash
  #multipartRequest: MultipartRequest = new MultipartRequest(); // 并发请求管理器
  #uploadType: 'simple' | 'multipart'; // 上传类型
  #simpleUploadParams?: UploadTaskSimpleUploadParams; // 简单上传参数
  #multipartUploadParams?: UploadTaskMultipartUploadParams; // 分片上传参数

  /**
   * @description: 状态
   */
  get status() {
    return this.#status;
  }

  /**
   * @description: 上传进度
   */
  get progress() {
    return this.#progress;
  }

  constructor(options: UploadTaskOptions) {
    super();
    this.#options = options;
    this.#uploadType = options.file.size > 1024 * 1024 * 100 ? 'multipart' : 'simple';
    this.init();
  }

  /**
   * @description: 初始化
   */
  async init() {
    this.#progress = 0;
    this.#changeStatus('init');
    try {
      this.#hash = this.#hash || (await getFileHash(this.#options.file)); // 计算hash值
      this.#step = 'checking';
      this.#changeStatus('ready');
    } catch (err) {
      this.#changeStatus('error');
    }
  }

  /**
   * @description: 开始
   */
  async start() {
    if (this.#status !== 'ready' && this.#status !== 'pause' && this.#status !== 'fail') return;
    let isExist: boolean;
    this.#changeStatus('play');
    try {
      // 校验文件
      if (this.#step === 'checking') {
        isExist = await this.#checkFile();
        this.#step = isExist ? 'creating' : 'uploading';
      }

      // 上传文件
      if (this.#step === 'uploading') {
        await this.#uploadFile();
        this.#step = 'creating';
      }

      // 创建文件
      if (this.#step === 'creating') {
        await this.#createFile();
        this.#changeStatus('success');
      }
    } catch (err) {
      if (err !== 'cancel') this.#changeStatus('fail');
    }
  }

  /**
   * @description: 暂停
   */
  pause() {
    if (this.#status !== 'play') return;
    this.#changeStatus('pause');
  }

  /**
   * @description: 取消
   */
  cancel() {
    if (this.#status == 'success' || this.#status === 'fail' || this.#status === 'cancel') return;
    this.#changeStatus('cancel');
  }

  /**
   * @description: 校验文件
   */
  async #checkFile(): Promise<boolean> {
    if (this.#status !== 'play') return Promise.reject('cancel');
    try {
      const res = await this.#multipartRequest.add(request, {
        url: '/fileSystem/checkHash',
        method: 'post',
        data: {
          folderPath: this.#options.path,
          fileName: this.#options.name,
          fileHash: this.#hash,
          fileSize: this.#options.file.size
        }
      });
      const data = res.data.data;

      if (data.isExist) return true;

      if (this.#uploadType === 'simple') {
        this.#simpleUploadParams = { uploadUrl: data.uploadUrl };
      } else {
        this.#multipartUploadParams = {
          uploadId: data.uploadId,
          list: [],
          number: 1,
          size: 20,
          total: Math.ceil(this.#options.file.size / (1024 * 1024)),
          partSize: 1024 * 1024
        };
      }
      return false;
    } catch (err) {
      return Promise.reject(axios.isCancel(err) ? 'cancel' : err);
    }
  }

  /**
   * @description: 上传文件
   */
  async #uploadFile() {
    if (this.#status !== 'play') return Promise.reject('cancel');
    try {
      if (this.#uploadType === 'simple') {
        await this.#multipartRequest.add(axios, {
          url: this.#simpleUploadParams?.uploadUrl,
          method: 'put',
          data: this.#options.file,
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            if (progressEvent.total) {
              this.#progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            }
          }
        });
      } else {
        const handleMultipartUpload = async () => {
          if (this.#multipartUploadParams!.number >= this.#multipartUploadParams!.total) return;
          const res = await this.#multipartRequest.add(request, {
            url: '/fileSystem/multipartUpload',
            method: 'post',
            data: {
              uploadId: this.#multipartUploadParams?.uploadId,
              number: this.#multipartUploadParams?.number,
              size: this.#multipartUploadParams?.size
            }
          });
          this.#multipartUploadParams?.list.push(
            ...res.data.data.list.map((url: string) => ({
              url,
              partNumber: this.#multipartUploadParams!.number++,
              etag: ''
            }))
          );

          for (const item of this.#multipartUploadParams?.list || []) {
            this.#multipartRequest
              .add(axios, {
                url: item.url,
                method: 'put',
                data: this.#options.file.slice(
                  (item.partNumber - 1) * 1024 * 1024,
                  item.partNumber * 1024 * 1024
                )
              })
              .then((res) => {
                item.etag = res.headers['etag'];
                this.#progress =
                  this.#options.file.size /
                  (this.#multipartUploadParams!.list.reduce(
                    (count, item) => (item.etag ? ++count : count),
                    0
                  ) *
                    this.#multipartUploadParams!.partSize);
              });
          }

          handleMultipartUpload();
        };

        handleMultipartUpload();
      }
    } catch (err) {
      return Promise.reject(axios.isCancel(err) ? 'cancel' : err);
    }
  }

  /**
   * @description: 创建文件
   */
  async #createFile() {}

  /**
   * @description: 改变状态
   * @param {UploadTaskStatus} status 状态
   */
  #changeStatus(status: UploadTaskStatus) {
    if (this.#status === status) return;
    this.#status = status;
    this.emit('status', status);
  }

  /**
   * @description: 改变暂停状态
   * @param {boolean} paused 是否暂停
   */
  #changePaused(paused: boolean) {
    if (this.#paused === paused) return;
    this.#paused = paused;
    this.emit('paused', paused);
  }
}

function main() {
  const uploadTask = new UploadTask({
    path: '/utils/test',
    name: 'test.jpg',
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
