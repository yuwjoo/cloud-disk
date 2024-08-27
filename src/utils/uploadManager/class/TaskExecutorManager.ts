/*
 * @FileName: 任务执行管理类
 * @FilePath: \cloud-disk\src\utils\transferManager\class\TaskExecutorManager.ts
 * @Author: YH
 * @Date: 2024-08-02 13:28:44
 * @LastEditors: YH
 * @LastEditTime: 2024-08-27 13:59:01
 * @Description:
 */
import { TaskExecutor } from './TaskExecutor';

export type TaskExecutorManagerOptions = {
  limit?: number; // 最大并发数
};

export type TaskExecutorManagerStartOptions = {
  onSuccess?: (value: any) => void;
  onFail?: (reason: any) => void;
  onCancel?: () => void;
};

export class TaskExecutorManager {
  #limit: number; // 最大并发数
  #taskPool: Set<TaskExecutor> = new Set(); // 任务池
  #awaitQueue: TaskExecutor[] = []; // 等待队列
  #paused: boolean = true; // 暂停中

  /**
   * @description: 等待中的任务数
   */
  get awaitingCount() {
    return this.#awaitQueue.length;
  }

  constructor(options: TaskExecutorManagerOptions = {}) {
    this.#limit = options.limit || 1;
  }

  /**
   * @description: 开始
   * @param {TaskExecutorManagerStartOptions} options 配置对象
   * @return {Promise<void>} promise对象
   */
  start(options: TaskExecutorManagerStartOptions = {}): Promise<void> {
    this.#paused = false;
    while (this.#awaitQueue.length && this.#taskPool.size < this.#limit) {
      this.#runTask(this.#awaitQueue.shift());
    }

    if (this.#taskPool.size === 0) {
      return Promise.resolve();
    }

    return new Promise<void>(async (resolve, reject) => {
      while (this.#taskPool.size > 0) {
        try {
          const res = await Promise.race(this.#taskPool);
          options.onSuccess?.(res);
        } catch (err) {
          if (err === TaskExecutor.CANCELLED) {
            options.onCancel?.();
          } else {
            options.onFail?.(err);
          }
        }
      }

      if (this.#awaitQueue.length === 0) {
        resolve();
      } else {
        reject();
      }

      this.#paused = true;
    });
  }

  /**
   * @description: 暂停
   */
  pause() {
    this.#paused = true;
    this.#taskPool.forEach((task) => {
      task.cancel();
      this.#awaitQueue.unshift(task);
    });
    this.#taskPool.clear();
  }

  /**
   * @description: 添加任务
   * @param {TaskExecutor} task 任务执行器
   */
  add(this: TaskExecutorManager, task: TaskExecutor) {
    this.#awaitQueue.push(task);
  }

  /**
   * @description: 删除指定任务
   * @param {TaskExecutor} task 任务执行器
   */
  delete(this: TaskExecutorManager, task: TaskExecutor) {
    task.cancel();
    if (!this.#taskPool.delete(task)) {
      this.#awaitQueue.splice(this.#awaitQueue.indexOf(task), 1);
    }
  }

  /**
   * @description: 清除所有任务
   */
  clear(this: TaskExecutorManager) {
    this.#awaitQueue = [];
    this.#taskPool.forEach((task) => task.cancel());
    this.#taskPool.clear();
  }

  /**
   * @description: 运行指定任务
   * @param {TaskExecutor} task 任务执行器
   */
  #runTask(task?: TaskExecutor) {
    if (!task) return;
    this.#taskPool.add(task);
    task.start().promise.finally(() => {
      if (this.#paused) return;
      this.#taskPool.delete(task);
      this.#runTask(this.#awaitQueue.shift());
    });
  }
}
