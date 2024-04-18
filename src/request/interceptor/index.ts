import type { AxiosInstance } from 'axios';

/**
 * @description: 添加请求拦截器
 * @param {AxiosInstance} request 请求实例
 * @return {void}
 */
export function addRequestInterceptor(request: AxiosInstance): void {
  // 发送请求拦截器
  request.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 接收响应拦截器
  request.interceptors.response.use(
    (response) => {
      const res = response.data;

      return res;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}
