/*
 * @FileName: 任务执行类
 * @FilePath: \cloud-disk\src\utils\uploadManager\class\TaskExecutor.ts
 * @Author: YH
 * @Date: 2024-08-14 16:56:01
 * @LastEditors: YH
 * @LastEditTime: 2024-08-28 17:01:33
 * @Description:
 */
export type TaskExecutorExecutor<T> = (
  resolve: (result?: T | any) => void,
  reject: (error?: any) => void
) => void;

export type TaskExecutorConfigs = {
  onCancel?: Function; // 监听取消事件函数
  retryCount?: number; // 可重试次数
};

export type TaskExecutorFlatPromise = {
  promise: Promise<any>;
  resolve: (result?: any) => void;
  reject: (error?: any) => void;
};

export class TaskExecutor<T = any> {
  static AWAITING = Symbol('awaiting'); // 等待
  static PENDING = Symbol('pending'); // 待定
  static FULFILLED = Symbol('fulfilled'); // 兑现
  static REJECTED = Symbol('rejected'); // 拒绝
  static CANCELLED = Symbol('cancelled'); // 取消

  #flatPromise: TaskExecutorFlatPromise; // 扁平化Promise
  #status: symbol = TaskExecutor.AWAITING; // 状态
  #executor: TaskExecutorExecutor<T>; // 执行函数
  #retryCount: number = 0; // 剩余重试次数
  #result?: any; // 返回结果
  #onCancel?: Function; // 监听取消事件函数

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
    return this.#flatPromise.promise;
  }

  constructor(executor: TaskExecutorExecutor<T>) {
    this.#flatPromise = this.#getFlatPromise();
    this.#executor = executor;
  }

  /**
   * @description: 配置
   * @param {TaskExecutorConfigs} configs 配置对象
   * @return {TaskExecutor}
   */
  configs(configs: TaskExecutorConfigs): TaskExecutor {
    this.#onCancel = configs.onCancel;
    this.#retryCount = Math.max(configs.retryCount || 0, 0);

    return this;
  }

  /**
   * @description: 启动
   * @return {TaskExecutor}
   */
  start(): TaskExecutor {
    if (this.#status !== TaskExecutor.AWAITING) return this;

    this.#status = TaskExecutor.PENDING;
    try {
      this.#executor(this.#resolve.bind(this), this.#reject.bind(this));
    } catch (err) {
      this.#reject(err);
    }

    return this;
  }

  /**
   * @description:  取消
   * @return {TaskExecutor}
   */
  cancel(): TaskExecutor {
    if (this.#status !== TaskExecutor.PENDING) return this;

    this.#onCancel?.();
    this.#flatPromise.reject(TaskExecutor.CANCELLED);

    return this;
  }

  /**
   * @description: 重试
   */
  #retry() {
    this.#retryCount--;
    try {
      this.#executor(this.#resolve.bind(this), this.#reject.bind(this));
    } catch (err) {
      this.#reject(err);
    }
  }

  /**
   * @description: 兑现
   */
  #resolve(result: T) {
    if (this.#status !== TaskExecutor.PENDING) return;

    // 成功请求
    this.#status = TaskExecutor.FULFILLED;
    this.#result = result;
    this.#flatPromise.resolve(this.#result);
  }

  /**
   * @description: 拒绝
   */
  #reject(result: any) {
    if (this.#status !== TaskExecutor.PENDING) return;

    // 取消处理
    if (result === TaskExecutor.CANCELLED) {
      this.#status = TaskExecutor.CANCELLED;
      this.#result = TaskExecutor.CANCELLED;
      this.#flatPromise.reject(this.#result);
      return;
    }

    // 重试处理
    if (this.#retryCount > 0) {
      this.#retry();
      return;
    }

    // 失败处理
    this.#status = TaskExecutor.REJECTED;
    this.#result = result;
    this.#flatPromise.reject(this.#result);
  }

  /**
   * @description: 获取扁平化Promise
   * @return {TaskExecutorFlatPromise}
   */
  #getFlatPromise(): TaskExecutorFlatPromise {
    let funs: any[] = [];
    const promise = new Promise((...args) => (funs = args));
    return { promise, resolve: funs[0], reject: funs[1] };
  }
}
