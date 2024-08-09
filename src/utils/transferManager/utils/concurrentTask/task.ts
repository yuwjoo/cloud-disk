export class Task<T = any> extends Promise<T> {
  #status: 'pending' | 'active' | 'fulfilled' | 'rejected' = 'pending';
  #callback: any[];
  #runFun: Function;

  get status() {
    return this.#status;
  }

  constructor(runFun: Function, ...args: any[]) {
    let callback: any;
    super((...arg) => (callback = arg));
    this.#callback = callback;
    this.#runFun = runFun.bind(this, ...args);
  }

  #resolve(value: unknown) {
    this.#status = 'fulfilled';
    this.#callback[0](value);
  }

  #reject(reason?: any) {
    this.#status = 'rejected';
    this.#callback[1](reason);
  }

  run(this: Task) {
    if (this.#status !== 'pending') return;
    this.#status = 'active';
    this.#runFun().then(this.#resolve).catch(this.#reject);
  }
}
