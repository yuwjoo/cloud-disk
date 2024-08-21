/*
 * @FileName: 任务执行器
 * @FilePath: \cloud-disk\src\utils\transferManager\utils\taskExecutorManager\TaskExecutor.ts
 * @Author: YH
 * @Date: 2024-08-14 16:56:01
 * @LastEditors: YH
 * @LastEditTime: 2024-08-15 15:54:40
 * @Description:
 */
export type TaskExecutorHandlerFun<T> = (
  success: (result?: T | any) => void,
  fail: (error?: any) => void,
  cancel: () => void
) => void;

export type TaskExecutorCallbacks = {
  success: Function[];
  fail: Function[];
  cancel: Function[];
};

export class TaskExecutor<T = any> {
  static AWAITING = Symbol('awaiting'); // 等待
  static PENDING = Symbol('pending'); // 待定
  static SUCCEED = Symbol('succeed'); // 成功
  static FAILED = Symbol('failed'); // 失败
  static CANCELLED = Symbol('cancelled'); // 取消

  #status: symbol = TaskExecutor.AWAITING; // 状态
  #result?: any; // 返回结果
  #promise: Promise<T> = Promise.resolve() as Promise<T>; // Promise实例
  #retryCount: number = 0; // 重试次数
  #resolve: (result?: T | any) => void = () => {}; // 成功回调
  #reject: (error?: any) => void = () => {}; // 失败回调
  #handlerFun: TaskExecutorHandlerFun<T>; // 处理函数
  #cancelFun?: Function; // 取消函数
  #callbacks: TaskExecutorCallbacks = { success: [], fail: [], cancel: [] }; // 回调集合

  /**
   * @description: 状态
   */
  get status() {
    return this.#status;
  }

  /**
   * @description: Promise实例
   */
  get promise() {
    return this.#promise;
  }

  /**
   * @description: 重试次数
   */
  get retryCount() {
    return this.#retryCount;
  }

  constructor(handlerFun: TaskExecutorHandlerFun<T>, cancelFun?: Function) {
    this.#handlerFun = handlerFun;
    this.#cancelFun = cancelFun;
    this.#initPromise();
  }

  /**
   * @description: 启动
   * @return {TaskExecutor} 任务执行器
   */
  start(this: TaskExecutor): TaskExecutor {
    if (this.#status !== TaskExecutor.AWAITING) return this;
    this.#status = TaskExecutor.PENDING;
    try {
      this.#handlerFun(this.success.bind(this), this.fail.bind(this), this.cancel.bind(this));
    } catch (err) {
      this.fail(err);
    }
    return this;
  }

  /**
   * @description: 重新启动
   * @return {TaskExecutor} 任务执行器
   */
  restart(this: TaskExecutor): TaskExecutor {
    if (this.#status === TaskExecutor.PENDING) return this;
    this.#retryCount = 0;
    this.#status = TaskExecutor.AWAITING;
    this.#initPromise();
    this.start();
    return this;
  }

  /**
   * @description: 重试
   * @return {TaskExecutor} 任务执行器
   */
  retry(this: TaskExecutor): TaskExecutor {
    if (this.#status !== TaskExecutor.FAILED) return this;
    this.#retryCount++;
    this.#status = TaskExecutor.AWAITING;
    this.#initPromise();
    this.start();
    return this;
  }

  /**
   * @description: 监听成功
   * @param {Function} callback 回调函数
   * @return {TaskExecutor} 任务执行器
   */
  onSuccess(this: TaskExecutor, callback: Function): TaskExecutor {
    if (this.#status === TaskExecutor.PENDING) {
      this.#callbacks.success.push(callback);
    } else if (this.#status === TaskExecutor.SUCCEED) {
      setTimeout(() => callback(this.#result));
    }
    return this;
  }

  /**
   * @description: 监听失败
   * @param {Function} callback 回调函数
   * @return {TaskExecutor} 任务执行器
   */
  onFail(this: TaskExecutor, callback: Function): TaskExecutor {
    if (this.#status === TaskExecutor.PENDING) {
      this.#callbacks.fail.push(callback);
    } else if (this.#status === TaskExecutor.FAILED) {
      setTimeout(() => callback(this.#result));
    }
    return this;
  }

  /**
   * @description: 监听取消
   * @param {Function} callback 回调函数
   * @return {TaskExecutor} 任务执行器
   */
  onCancel(this: TaskExecutor, callback: Function): TaskExecutor {
    if (this.#status === TaskExecutor.PENDING) {
      this.#callbacks.cancel.push(callback);
    } else if (this.#status === TaskExecutor.CANCELLED) {
      setTimeout(() => callback());
    }
    return this;
  }

  /**
   * @description: 成功
   */
  success(this: TaskExecutor, result: T): TaskExecutor {
    if (this.#status !== TaskExecutor.PENDING) return this;
    setTimeout(() => {
      this.#status = TaskExecutor.SUCCEED;
      this.#result = result;
      this.#callbacks.success.forEach((callback) => callback(result));
      this.#resolve(result);
    });
    return this;
  }

  /**
   * @description: 失败
   */
  fail(this: TaskExecutor, result: any): TaskExecutor {
    if (this.#status !== TaskExecutor.PENDING) return this;
    setTimeout(() => {
      this.#status = TaskExecutor.FAILED;
      this.#result = result;
      this.#callbacks.fail.forEach((callback) => callback(result));
      this.#reject(result);
    });
    return this;
  }

  /**
   * @description: 取消
   */
  cancel(this: TaskExecutor): TaskExecutor {
    if (this.#status !== TaskExecutor.PENDING) return this;
    this.#cancelFun?.();
    setTimeout(() => {
      this.#status = TaskExecutor.CANCELLED;
      this.#result = TaskExecutor.CANCELLED;
      this.#callbacks.cancel.forEach((callback) => callback());
      this.#reject(this.#result);
    });
    return this;
  }

  /**
   * @description: 初始化Promise
   */
  #initPromise(this: TaskExecutor) {
    let funs: any[] = [];
    this.#promise = new Promise<T>((...args) => (funs = args));
    this.#resolve = funs[0];
    this.#reject = funs[1];
  }
}
