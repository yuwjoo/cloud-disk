import axios from 'axios';
import { RESPONSE_CODE } from '@/types/request';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useRouter } from '../vue-router';
import { useUserStore } from '@/store/user';

export const request = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVERURL,
  timeout: 30000, // 请求超时时间
  withCredentials: false // 表示跨域请求时是否需要使用凭证
});

/**
 * @description: 请求拦截
 */
function requestInterceptor(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> {
  config.headers['Authorization'] = `Bearer  ${useUserStore().token}`;
  return config;
}

/**
 * @description: 响应拦截
 */
function responseInterceptor(response: AxiosResponse): AxiosResponse | Promise<AxiosResponse> {
  const res = response.data;

  if (res.code === RESPONSE_CODE.OK) {
    return res;
  }

  handleError(res);

  if (res.code === RESPONSE_CODE.UNAUTHORIZED) {
    localStorage.clear();
    useRouter().replace('/login');
  }

  throw res;
}

/**
 * @description: 处理异常
 */
function handleError(error: any) {
  ElMessage({ type: 'error', message: error.message || error.msg || '网络繁忙！' });
}

request.interceptors.request.use(requestInterceptor, handleError);
request.interceptors.response.use(responseInterceptor, handleError);
