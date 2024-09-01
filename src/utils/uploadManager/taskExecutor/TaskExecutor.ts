/*
 * @FileName: 任务执行器
 * @FilePath: \cloud-disk\src\utils\uploadManager\taskExecutor\AsyncTask.ts
 * @Author: YH
 * @Date: 2024-08-14 16:56:01
 * @LastEditors: YH
 * @LastEditTime: 2024-08-31 18:14:33
 * @Description:
 */
export type TaskExecutorConfigs<T = any> = {
  onExecutor: (resolve: (value: T) => void, reject: (reason?: any) => void) => void; // 执行回调
  onSuccess?: (value: T) => void; // 成功回调
  onFail?: (reason: any) => void; // 失败回调
  onCancel?: () => void; // 取消回调
};

export class TaskExecutor<T = any> {
  #promise: Promise<T>; // promise
  #resolve: (value: T) => void; // promise兑现回调
  #reject: (reason: any) => void; // promise拒绝回调
  onExecutor: TaskExecutorConfigs['onExecutor']; // 执行回调
  onCancel?: TaskExecutorConfigs['onCancel']; // 取消回调

  // 获取promise
  get promise(): Promise<T> {
    return this.#promise;
  }

  constructor(configs: TaskExecutorConfigs<T>) {
    let cbs: any[] = [];
    this.#promise = new Promise((...args) => (cbs = args));
    this.#resolve = cbs[0];
    this.#reject = cbs[1];
    this.onExecutor = configs.onExecutor;
    this.onCancel = configs.onCancel;
    this.#promise.then(configs.onSuccess, configs.onFail);
  }

  /**
   * @description: 执行
   * @return {TaskExecutor<T>} TaskExecutor
   */
  exec(): TaskExecutor<T> {
    this.onExecutor(this.#resolve, this.#reject);
    return this;
  }

  /**
   * @description:  取消
   * @return {TaskExecutor<T>} TaskExecutor
   */
  cancel(): TaskExecutor<T> {
    this.onCancel?.();
    return this;
  }
}
