import type { RunFun } from '.';

export class Task<T = any> extends Promise<T> {
  #resolve: (value: unknown) => void = () => {};
  #reject: (reason?: any) => void = () => {};

  runFun: RunFun;
  args: any[];
  done: () => void;

  constructor(runFun: RunFun, args: any[], done: () => void) {
    const callbacks: any[] = [];
    super((...arg) => callbacks.push(...arg));
    this.#resolve = callbacks[0];
    this.#reject = callbacks[1];

    this.runFun = runFun;
    this.args = args;
    this.done = done;
  }

  run(this: Task) {
    const promise = this.runFun(...this.args);
    promise.then(this.#resolve).catch(this.#reject).finally(this.done);
  }
}
