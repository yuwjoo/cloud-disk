import type { AxiosInstance, AxiosRequestConfig, CancelTokenSource } from 'axios';
import axios from 'axios';
import type {
  RequestFun,
  concurrentRequestOptions,
  ConcurrentRequestAllOptions,
  ConcurrentRequestAllReturn,
  AwaitRequestQueue
} from 'types/src/utils/concurrentRequest';

class Task extends Promise<any> {
  resolve: (value: unknown) => void = () => {};
  reject: (reason?: any) => void = () => {};
  concurrentRequest: ConcurrentRequest;
  request: AxiosInstance;
  params: AxiosRequestConfig;
  cancelTokenSource: CancelTokenSource;
  isRun: boolean = false;

  constructor(
    concurrentRequest: ConcurrentRequest,
    request: AxiosInstance,
    params: AxiosRequestConfig
  ) {
    const callbacks: any[] = [];
    super((...arg) => callbacks.push(...arg));
    this.resolve = callbacks[0];
    this.reject = callbacks[1];
    this.concurrentRequest = concurrentRequest;
    this.request = request;
    this.params = params;
    this.cancelTokenSource = axios.CancelToken.source();
  }

  run(this: Task) {
    if (this.isRun) return;
    this.isRun = true;
    this.request({ ...this.params, cancelToken: this.cancelTokenSource.token })
      .then(this.resolve)
      .catch(this.reject)
      .finally(this.#complete.bind(this));
  }

  cancel(this: Task) {
    if (this.isRun) {
      this.cancelTokenSource.cancel();
    } else {
      const pos = this.concurrentRequest.awaitQueue.indexOf(this);
      if (pos === -1) return;
      this.concurrentRequest.awaitQueue.splice(pos, 1);
    }
  }

  #complete(this: Task) {
    const nextTask = this.concurrentRequest.awaitQueue.shift();
    this.concurrentRequest.taskPool.delete(this);
    if (nextTask) {
      this.concurrentRequest.taskPool.add(nextTask);
      nextTask.run();
    }
  }
}

class ConcurrentRequest {
  maxTaskSize: number = 1; // 最大并发数
  taskPool: Set<Task> = new Set(); // 任务池
  awaitQueue: Task[] = []; // 等待队列

  constructor(maxTaskSize: number) {
    this.maxTaskSize = maxTaskSize || 1;
  }

  addTask(params: AxiosRequestConfig, options: concurrentRequestOptions = {}): Task {
    const task = new Task(this, options.axios || axios, params);

    if (this.taskPool.size < maxTaskSize) {
      this.taskPool.add(task);
      task.run();
    } else if (options.unshift) {
      this.awaitQueue.unshift(task);
    } else {
      this.awaitQueue.push(task);
    }

    return task;
  }

  addBatchTask(paramsAll: AxiosRequestConfig[], options: concurrentRequestOptions = {}) {
    const concurrentRequest = new ConcurrentRequest(this.maxTaskSize);
    const tasks = new Set(); // 任务池
    

  }
}

const maxTaskSize = 5; // 最大并发数
const taskPool = new Set(); // 任务池
const awaitQueue: RequestFun[] = []; // 等待队列

/**
 * @description: 并发请求
 * @param {RequestFun} requestFun 请求函数
 * @param {concurrentRequestOptions} options 配置
 * @return {Promise<any>} promise对象
 */
export function concurrentRequest(
  requestFun: RequestFun,
  options: concurrentRequestOptions = {}
): Promise<any> {
  return new Promise((resolve, reject) => {
    const task = async () => {
      try {
        const res = await requestFun();
        resolve(res);
      } catch (err) {
        reject(err);
      } finally {
        const nextTask = awaitQueue.shift();
        taskPool.delete(task);
        if (nextTask) {
          taskPool.add(nextTask);
          nextTask();
        }
      }
    };

    if (taskPool.size < maxTaskSize) {
      taskPool.add(task);
      task();
    } else if (options.unshift) {
      awaitQueue.unshift(task);
    } else {
      awaitQueue.push(task);
    }
  });
}

/**
 * @description: 并发请求所有
 * @param {RequestFun[]} requestFuns 请求函数数组
 * @param {ConcurrentRequestAllOptions} options 配置
 * @return {ConcurrentRequestAllReturn} 操作对象
 */
export function concurrentRequestAll(
  requestFuns: RequestFun[],
  options: ConcurrentRequestAllOptions = {}
): ConcurrentRequestAllReturn {
  let status = 'pending'; // 状态: pending | fulfilled | rejected
  const requestPool = new Set(); // 请求池
  const awaitRequestQueue: AwaitRequestQueue = []; // 等待队列
  const insertRequest = (requestFuns: RequestFun[], unshift?: boolean) => {
    const addCount = maxTaskSize - requestPool.size;
    awaitRequestQueue.push(...requestFuns.map((requestFun) => ({ requestFun, unshift })));
    for (let i = 0; i < addCount; i++) {
      const awaitRequest = awaitRequestQueue.shift();
      if (!awaitRequest) break;
      addTask(awaitRequest.requestFun, awaitRequest.unshift);
    }
  };
  const addTask = async (requestFun: RequestFun, unshift?: boolean) => {
    const request = concurrentRequest(requestFun, { unshift });
    let awaitRequest: AwaitRequestQueue[0] | undefined;
    requestPool.add(request);
    try {
      await request;
      if (status === 'rejected') return;
      awaitRequest = awaitRequestQueue.shift();
      if (awaitRequest) addTask(awaitRequest.requestFun, awaitRequest.unshift);
    } catch (err) {
      if (options.retry && options.retry-- > 0) {
        addTask(requestFun, true);
      } else {
        status = 'rejected';
      }
    } finally {
      requestPool.delete(request);
    }
  };

  insertRequest(requestFuns, options.unshift);

  const promise = new Promise(async (resolve, reject) => {
    while (requestPool.size > 0) {
      try {
        await Promise.race(requestPool);
      } catch (err) {
        /* empty */
      }
    }
    status === 'rejected' ? reject() : resolve(true);
  });

  return { insertRequest, promise };
}
