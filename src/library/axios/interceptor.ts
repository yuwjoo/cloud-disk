import { RESPONSE_CODE } from '@/types/request';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useRouter } from '../vue-router';
import { useUserStore } from '@/store/user';

/**
 * @description: 请求拦截
 */
export function requestInterceptor(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> {
  config.headers['Authorization'] = 'Bearer ' + useUserStore().token;
  return config;
}

/**
 * @description: 响应拦截
 */
export function responseInterceptor(
  response: AxiosResponse
): AxiosResponse | Promise<AxiosResponse> {
  const res = response.data;

  if (res.code === RESPONSE_CODE.OK) {
    return res;
  }

  ElMessage({ type: 'error', message: res.msg });

  if (res.code === RESPONSE_CODE.UNAUTHORIZED) {
    localStorage.clear();
    useRouter().replace('/login');
  }

  throw res;
}
