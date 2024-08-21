/*
 * @FileName: 任务执行器管理
 * @FilePath: \cloud-disk\src\utils\transferManager\utils\taskExecutorManager\TaskExecutorManager.ts
 * @Author: YH
 * @Date: 2024-08-02 13:28:44
 * @LastEditors: YH
 * @LastEditTime: 2024-08-21 13:37:56
 * @Description:
 */

import type { TaskExecutor } from './TaskExecutor';

export type TaskExecutorManagerOptions = {
  limit?: number; // 最大并发数
};

export class TaskExecutorManager {
  #limit: number; // 最大并发数
  #taskPool: Set<TaskExecutor> = new Set(); // 任务池
  #awaitQueue: TaskExecutor[] = []; // 等待队列

  constructor(options: TaskExecutorManagerOptions = {}) {
    this.#limit = options.limit || 1;
  }

  /**
   * @description: 添加任务
   * @param {TaskExecutor} task 任务实例
   */
  add(this: TaskExecutorManager, task: TaskExecutor) {
    if (this.#taskPool.size < this.#limit) {
      this.#runTask(task);
    } else {
      this.#awaitQueue.push(task);
    }
  }

  /**
   * @description: 删除指定任务
   * @param {TaskExecutor} task 任务实例
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
    this.#taskPool.forEach((task) => task.cancel());
    this.#taskPool.clear();
    this.#awaitQueue = [];
  }

  /**
   * @description: 运行指定任务
   */
  #runTask(task?: TaskExecutor) {
    if (!task) return;
    this.#taskPool.add(task);
    task.start().promise.finally(() => {
      this.#taskPool.delete(task);
      this.#runTask(this.#awaitQueue.shift());
    });
  }
}
