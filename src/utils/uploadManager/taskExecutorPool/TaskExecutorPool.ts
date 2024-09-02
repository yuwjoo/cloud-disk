/*
 * @FileName: 任务执行器池
 * @FilePath: \cloud-disk\src\utils\uploadManager\TaskExecutorPool\TaskExecutorPool.ts
 * @Author: YH
 * @Date: 2024-08-29 15:56:35
 * @LastEditors: YH
 * @LastEditTime: 2024-09-02 17:34:05
 * @Description:
 */
import { TaskExecutor } from './TaskExecutor';

export type TaskExecutorPoolOptions = {
  maxExecCount?: number;
};

export type AllSettledResult =
  | { status: 'fulfilled'; value: any }
  | { status: 'rejected'; reason: any };

export class TaskExecutorPool {
  execPool: Set<TaskExecutor> = new Set(); // 执行池
  awaitQueue: TaskExecutor[] = []; // 等待队列
  maxExecCount: number; // 最大并发执行数

  // 执行中的任务数
  get execCount(): number {
    return this.execPool.size;
  }

  // 等待中的任务数
  get awaitCount(): number {
    return this.awaitQueue.length;
  }

  // 执行池是否已满
  get filled(): boolean {
    return this.execCount >= this.maxExecCount;
  }

  constructor(options: TaskExecutorPoolOptions = {}) {
    this.maxExecCount = options.maxExecCount || 1;
  }

  /**
   * @description: 添加
   * @param {TaskExecutor} taskExecutor 任务执行器
   */
  add(taskExecutor: TaskExecutor) {
    this.filled ? this.awaitQueue.push(taskExecutor) : this.#runTask(taskExecutor);
  }

  /**
   * @description: 删除
   * @param {TaskExecutor} taskExecutor 任务执行器
   */
  delete(taskExecutor: TaskExecutor) {
    if (this.execPool.has(taskExecutor)) {
      taskExecutor.cancel();
      this.execPool.delete(taskExecutor);
    } else {
      this.awaitQueue = this.awaitQueue.filter((t) => t !== taskExecutor);
    }
  }

  /**
   * @description: 清除
   */
  clear() {
    this.awaitQueue = [];
    this.execPool.forEach((taskConfig) => taskConfig.cancel());
    this.execPool.clear();
  }

  /**
   * @description: 监听任务执行器（全部成功resolve, 否则reject）
   * @return {Promise<any[]>} promise
   */
  all(): Promise<any[]> {
    const values: any[] = [];
    const reasons: any[] = [];
    if (this.execCount === 0) return Promise.resolve(values);
    return new Promise<any>(async (resolve, reject) => {
      while (this.execCount > 0) {
        try {
          values.push(await Promise.race([...this.execPool].map((t) => t.promise)));
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
   * @return {Promise<AllSettledResult[]>} promise
   */
  allSettled(): Promise<AllSettledResult[]> {
    const results: AllSettledResult[] = [];
    if (this.execCount === 0) return Promise.resolve(results);
    return new Promise(async (resolve) => {
      while (this.execCount > 0) {
        try {
          results.push({
            status: 'fulfilled',
            value: await Promise.race([...this.execPool].map((t) => t.promise))
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
   * @description: 运行任务
   * @param {TaskExecutor} taskExecutor 任务
   */
  async #runTask(taskExecutor?: TaskExecutor) {
    if (!taskExecutor) return;
    this.execPool.add(taskExecutor);
    try {
      await taskExecutor.exec().promise;
    } catch (err) {
      /* empty */
    }
    this.execPool.delete(taskExecutor);
    this.#runTask(this.awaitQueue.shift());
  }
}
