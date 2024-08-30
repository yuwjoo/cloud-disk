/*
 * @FileName: 任务类
 * @FilePath: \cloud-disk\src\utils\uploadManager\taskExecutor\Task.ts
 * @Author: YH
 * @Date: 2024-08-14 16:56:01
 * @LastEditors: YH
 * @LastEditTime: 2024-08-30 17:56:28
 * @Description:
 */

export type TaskConfig = {
  onExecutor: () => Promise<any>;
  onRemove?: Function;
};

export class Task<T = any> extends Promise<T> {
  static CANCEL = Symbol('cancel'); // 取消标识

  promiseCallbacks: any[]; // promise回调
  onExecutor: Function; // 执行回调
  onRemove?: Function; // 移除回调

  constructor(config: TaskConfig) {
    let cbs: any[] = [];
    super((...args) => (cbs = args));
    this.promiseCallbacks = cbs;
    this.onExecutor = config.onExecutor;
    this.onRemove = config.onRemove;
  }

  /**
   * @description: 执行
   * @return {Task} task
   */
  exec(): Task {
    this.onExecutor()
      .then(this.promiseCallbacks[0])
      .catch(() => {
        // debugger;
        console.log('异常', this.promiseCallbacks[1]);
      });
    return this;
  }

  /**
   * @description:  移除
   * @return {Task} task
   */
  remove(): Task {
    this.onRemove?.();
    return this;
  }
}
