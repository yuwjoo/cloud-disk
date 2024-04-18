import axios from 'axios';
import { addRequestInterceptor } from './interceptor';

export const request = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVERURL,
  timeout: 30000, // 请求超时时间
  withCredentials: false // 表示跨域请求时是否需要使用凭证
});

addRequestInterceptor(request);
