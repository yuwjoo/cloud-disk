import { Task } from './Task';

export type RunFun = (...args: any[]) => Promise<any>;

export class ConcurrentTask {
  limit: number; // 最大并发数
  taskPool: Set<Task> = new Set(); // 任务池
  awaitQueue: Task[] = []; // 等待队列

  constructor(limit: number) {
    this.limit = limit || 1;
  }

  pushTask(this: ConcurrentTask, runFun: RunFun, ...args: any[]): Task {
    return this.addTask(runFun, args, false);
  }

  unshiftTask(this: ConcurrentTask, runFun: RunFun, ...args: any[]): Task {
    return this.addTask(runFun, args, true);
  }

  addTask(this: ConcurrentTask, runFun: RunFun, args: any[], isUnshift?: boolean): Task {
    const task = new Task(runFun, args, () => {
      const nextTask = this.awaitQueue.shift();
      this.taskPool.delete(task);
      if (nextTask) {
        this.taskPool.add(nextTask);
        nextTask.run();
      }
    });

    if (this.taskPool.size < this.limit) {
      this.taskPool.add(task);
      task.run();
    } else if (isUnshift) {
      this.awaitQueue.unshift(task);
    } else {
      this.awaitQueue.push(task);
    }
    return task;
  }

  deleteTask(this: ConcurrentTask, task: Task) {
    const success = this.taskPool.delete(task);
    if (!success) this.awaitQueue.splice(this.awaitQueue.indexOf(task), 1);
  }

  clear(this: ConcurrentTask) {
    this.taskPool.clear();
    this.awaitQueue = [];
  }
}
