/*
 * @FileName: 并发管理器
 * @FilePath: \cloud-disk\src\utils\uploadManager\taskExecutor\ConcurrencyManager.ts
 * @Author: YH
 * @Date: 2024-08-29 15:56:35
 * @LastEditors: YH
 * @LastEditTime: 2024-08-31 18:17:01
 * @Description:
 */

export type ConcurrencyManagerOptions = {
  concurrencyLevel?: number;
};

export type AllSettledResult =
  | { status: 'fulfilled'; value: any }
  | { status: 'rejected'; reason: any };

export class ConcurrencyManager {
  execPool: Set<Task> = new Set(); // 执行池
  awaitQueue: Task[] = []; // 等待队列
  concurrencyLevel: number; // 并发数

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

  constructor(options: ConcurrencyManagerOptions = {}) {
    this.concurrencyLevel = options.concurrencyLevel || 1;
  }

  /**
   * @description: 监听任务执行器（全部成功resolve, 否则reject）
   * @param {ConcurrencyManager} ConcurrencyManager 任务执行器
   * @return {Promise<any>} promise
   */
  static all(ConcurrencyManager: ConcurrencyManager): Promise<any> {
    const values: any[] = [];
    const reasons: any[] = [];
    return new Promise<any>(async (resolve, reject) => {
      while (ConcurrencyManager.execCount > 0) {
        try {
          values.push(await Promise.race(ConcurrencyManager.execPool));
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
   * @param {ConcurrencyManager} ConcurrencyManager 任务执行器
   * @return {Promise<AllSettledResult[]>} promise
   */
  static allSettled(ConcurrencyManager: ConcurrencyManager): Promise<AllSettledResult[]> {
    const results: AllSettledResult[] = [];
    return new Promise(async (resolve) => {
      while (ConcurrencyManager.execCount > 0) {
        try {
          results.push({
            status: 'fulfilled',
            value: await Promise.race(ConcurrencyManager.execPool)
          });
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
    if (this.execCount < this.concurrencyLevel) {
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
