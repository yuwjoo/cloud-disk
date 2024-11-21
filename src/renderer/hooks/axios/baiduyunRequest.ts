import axios from 'axios';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const baiduyunRequest = axios.create({
  baseURL: 'https://pan.baidu.com',
  timeout: 30000, // 请求超时时间
  withCredentials: false // 表示跨域请求时是否需要使用凭证
});

/**
 * @description: 请求拦截
 */
function requestInterceptor(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> {
  config.params = { ...config.params, access_token: localStorage.getItem('baiduyun_access_token') };
  return config;
}

/**
 * @description: 响应拦截
 */
function responseInterceptor(response: AxiosResponse): AxiosResponse | Promise<AxiosResponse> {
  return response.data;
}

/**
 * @description: 处理异常
 */
function handleError(error: any) {
  ElMessage({ type: 'error', message: error.message || error.msg || '网络繁忙！' });
}

baiduyunRequest.interceptors.request.use(requestInterceptor, handleError);
baiduyunRequest.interceptors.response.use(responseInterceptor, handleError);
