import router from '@/router';
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
      config.headers['Authorization'] = localStorage.getItem('token');
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

      if (res.code === 20200) {
        return res;
      } else if (res.code === 40400 || res.code === 50501) {
        console.error(res.msg);
        return Promise.reject(res);
      } else if (res.code === 40401) {
        localStorage.clear();
        router.replace('/login');
        return Promise.reject(res);
      }

      return res;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}
