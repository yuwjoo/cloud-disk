import type {
  RequestFun,
  concurrentRequestOptions,
  ConcurrentRequestAllOptions,
  ConcurrentRequestAllReturn,
  AwaitRequestQueue
} from 'types/src/utils/concurrentRequest';

const maxTaskSize = 5; // 最大并发数
const taskPool = new Set(); // 任务池
const awaitQueue: RequestFun[] = []; // 等待队列

/**
 * @description: 并发请求
 * @param {RequestFun} requestFun 请求函数
 * @param {concurrentRequestOptions} options 配置
 * @return {Promise<any>} promise对象
 */
export function concurrentRequest(
  requestFun: RequestFun,
  options: concurrentRequestOptions = {}
): Promise<any> {
  return new Promise((resolve, reject) => {
    const task = async () => {
      try {
        const res = await requestFun();
        resolve(res);
      } catch (err) {
        reject(err);
      } finally {
        const nextTask = awaitQueue.shift();
        taskPool.delete(task);
        if (nextTask) {
          taskPool.add(nextTask);
          nextTask();
        }
      }
    };

    if (taskPool.size < maxTaskSize) {
      taskPool.add(task);
      task();
    } else if (options.unshift) {
      awaitQueue.unshift(task);
    } else {
      awaitQueue.push(task);
    }
  });
}

/**
 * @description: 并发请求所有
 * @param {RequestFun[]} requestFuns 请求函数数组
 * @param {ConcurrentRequestAllOptions} options 配置
 * @return {ConcurrentRequestAllReturn} 操作对象
 */
export function concurrentRequestAll(
  requestFuns: RequestFun[],
  options: ConcurrentRequestAllOptions = {}
): ConcurrentRequestAllReturn {
  let status = 'pending'; // 状态: pending | fulfilled | rejected
  const requestPool = new Set(); // 请求池
  const awaitRequestQueue: AwaitRequestQueue = []; // 等待队列
  const insertRequest = (requestFuns: RequestFun[], unshift?: boolean) => {
    const addCount = maxTaskSize - requestPool.size;
    awaitRequestQueue.push(...requestFuns.map((requestFun) => ({ requestFun, unshift })));
    for (let i = 0; i < addCount; i++) {
      const awaitRequest = awaitRequestQueue.shift();
      if (!awaitRequest) break;
      addTask(awaitRequest.requestFun, awaitRequest.unshift);
    }
  };
  const addTask = async (requestFun: RequestFun, unshift?: boolean) => {
    const request = concurrentRequest(requestFun, { unshift });
    let awaitRequest: AwaitRequestQueue[0] | undefined;
    requestPool.add(request);
    try {
      await request;
      if (status === 'rejected') return;
      awaitRequest = awaitRequestQueue.shift();
      if (awaitRequest) addTask(awaitRequest.requestFun, awaitRequest.unshift);
    } catch (err) {
      if (options.retry && options.retry-- > 0) {
        addTask(requestFun, true);
      } else {
        status = 'rejected';
      }
    } finally {
      requestPool.delete(request);
    }
  };

  insertRequest(requestFuns, options.unshift);

  const promise = new Promise(async (resolve, reject) => {
    while (requestPool.size > 0) {
      try {
        await Promise.race(requestPool);
      } catch (err) {
        /* empty */
      }
    }
    status === 'rejected' ? reject() : resolve(true);
  });

  return { insertRequest, promise };
}
