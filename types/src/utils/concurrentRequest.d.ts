export type RequestFun = (...arg: any) => Promise<any>;

export type concurrentRequestOptions = { axios?: AxiosInstance; unshift?: boolean };

export type ConcurrentRequestAllOptions = { retry?: number; unshift?: boolean };

export type ConcurrentRequestAllReturn = {
  insertRequest: (requestFuns: RequestFun[], unshift?: boolean) => void;
  promise: Promise<any>;
};

export type AwaitRequestQueue = { requestFun: RequestFun; unshift?: boolean }[];
