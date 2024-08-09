import { Task } from './task';

export type Options = { limit?: number };

export class ConcurrentTask {
  #limit: number; // 最大并发数
  #taskPool: Set<Task> = new Set(); // 任务池
  #awaitQueue: Task[] = []; // 等待队列

  get limit() {
    return this.#limit;
  }

  get taskPool() {
    return this.#taskPool;
  }

  get awaitQueue() {
    return this.#awaitQueue;
  }

  constructor(options: Options = {}) {
    this.#limit = options.limit || 1;
  }

  push(this: ConcurrentTask, runFun: Function, ...args: any[]): Task {
    return this.#addTask(new Task(runFun, ...args), 'push');
  }

  unshift(this: ConcurrentTask, runFun: Function, ...args: any[]): Task {
    return this.#addTask(new Task(runFun, ...args), 'unshift');
  }

  #addTask(this: ConcurrentTask, task: Task, operate: 'push' | 'unshift'): Task {
    if (this.#taskPool.size < this.limit) {
      this.#runTask(task);
    } else {
      this.#awaitQueue[operate](task);
    }
    task.finally(() => {
      this.#taskPool.delete(task);
      this.#runTask(this.#awaitQueue.shift());
    });

    return task;
  }

  #runTask(task?: Task) {
    if (!task) return;
    this.#taskPool.add(task);
    task.run();
  }

  deleteTask(this: ConcurrentTask, task: Task) {
    if (!this.#taskPool.delete(task)) {
      this.#awaitQueue.splice(this.#awaitQueue.indexOf(task), 1);
    }
  }

  clear(this: ConcurrentTask) {
    this.#taskPool.clear();
    this.#awaitQueue = [];
  }
}
