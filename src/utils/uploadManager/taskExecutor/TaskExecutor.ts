/*
 * @FileName: 任务执行器
 * @FilePath: \cloud-disk\src\utils\uploadManager\taskExecutor\TaskExecutor.ts
 * @Author: YH
 * @Date: 2024-08-29 15:56:35
 * @LastEditors: YH
 * @LastEditTime: 2024-08-30 17:34:29
 * @Description:
 */
import { Task, type TaskConfig } from './Task';

export type TaskExecutorOptions = {
  maxExecNum?: number;
};

export type AllSettledResult =
  | { status: 'fulfilled'; value: any }
  | { status: 'rejected'; reason: any };

export class TaskExecutor {
  execPool: Set<Task> = new Set(); // 执行池
  awaitQueue: Task[] = []; // 等待队列
  maxExecNum: number; // 最大执行数

  // 执行中的任务数
  get execCount(): number {
    return this.execPool.size;
  }

  // 等待中的任务数
  get awaitCount(): number {
    return this.awaitQueue.length;
  }

  // 是否空闲
  get idle(): boolean {
    return this.execCount === 0 && this.awaitCount === 0;
  }

  constructor(options: TaskExecutorOptions = {}) {
    this.maxExecNum = options.maxExecNum || 1;
  }

  /**
   * @description: 监听任务执行器（全部成功resolve, 否则reject）
   * @param {TaskExecutor} taskExecutor 任务执行器
   * @return {Promise<any>} promise
   */
  static all(taskExecutor: TaskExecutor): Promise<any> {
    const values: any[] = [];
    const reasons: any[] = [];
    return new Promise<any>(async (resolve, reject) => {
      while (taskExecutor.execCount > 0) {
        try {
          values.push(await Promise.race(taskExecutor.execPool));
        } catch (err) {
          reasons.push(err);
          break;
        }
      }
      reasons.length ? reject(reasons[0]) : resolve(values);
    });
  }

  /**
   * @description: 监听任务执行器（不管成功失败，所有任务执行完成后resolve）
   * @param {TaskExecutor} taskExecutor 任务执行器
   * @return {Promise<AllSettledResult[]>} promise
   */
  static allSettled(taskExecutor: TaskExecutor): Promise<AllSettledResult[]> {
    const results: AllSettledResult[] = [];
    return new Promise(async (resolve) => {
      while (taskExecutor.execCount > 0) {
        try {
          results.push({ status: 'fulfilled', value: await Promise.race(taskExecutor.execPool) });
        } catch (err) {
          results.push({ status: 'rejected', reason: err });
          break;
        }
      }
      resolve(results);
    });
  }

  /**
   * @description: 添加任务
   * @param {TaskConfig} taskConfig 任务配置
   * @return {Task} 任务
   */
  addTask(taskConfig: TaskConfig): Task {
    const task = new Task(taskConfig);
    if (this.execCount < this.maxExecNum) {
      this.#runTask(task);
    } else {
      this.awaitQueue.push(task);
    }
    return task;
  }

  /**
   * @description: 运行任务
   * @param {Task} task 任务
   */
  async #runTask(task?: Task) {
    if (!task) return;
    this.execPool.add(task);
    try {
      await task.exec();
      this.execPool.delete(task);
    } catch (err) {
      this.execPool.delete(task);
    } finally {
      this.#runTask(this.awaitQueue.shift());
    }
  }

  /**
   * @description: 移除任务
   * @param {Task} task 任务
   */
  removeTask(task: Task) {
    if (this.execPool.has(task)) {
      task.remove();
      this.execPool.delete(task);
    } else {
      this.awaitQueue = this.awaitQueue.filter((t) => t !== task);
    }
  }

  /**
   * @description: 清除任务
   */
  clearTask() {
    this.awaitQueue = [];
    this.execPool.forEach((taskConfig) => taskConfig.remove());
    this.execPool.clear();
  }
}
