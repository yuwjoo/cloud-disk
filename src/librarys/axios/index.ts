import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { requestInterceptor, responseInterceptor } from './interceptor';

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVERURL,
  timeout: 30000, // 请求超时时间
  withCredentials: false // 表示跨域请求时是否需要使用凭证
});

request.interceptors.request.use(requestInterceptor);
request.interceptors.response.use(responseInterceptor);

/**
 * @description: 获取request
 * @return {Promise<AxiosResponse>} 请求结果
 */
export function useRequest<T = any, R = AxiosResponse<T>, D = any>(
  config: AxiosRequestConfig<D>
): Promise<R> {
  return request(config);
}
