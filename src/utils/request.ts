import router from '@/utils/router';
import axios from 'axios';
import type { AxiosInstance } from 'axios';

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVERURL,
  timeout: 30000, // 请求超时时间
  withCredentials: false // 表示跨域请求时是否需要使用凭证
});

addRequestInterceptor(request);

/**
 * @description: 添加请求拦截器
 * @param {AxiosInstance} request 请求实例
 * @return {void}
 */
function addRequestInterceptor(request: AxiosInstance): void {
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
        ElMessage({
          type: 'error',
          message: res.msg
        });
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

export default request;
