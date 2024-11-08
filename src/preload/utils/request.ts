import axios from 'axios';

export const baiduyunRequest = axios.create({
  baseURL: 'https://pan.baidu.com',
  timeout: 30000, // 请求超时时间
  withCredentials: false // 表示跨域请求时是否需要使用凭证
}); // 百度云请求函数

baiduyunRequest.interceptors.request.use((config) => {
  config.data = { ...config.data, access_token: localStorage.getItem('baiduyun_access_token') };
  return config;
});

baiduyunRequest.interceptors.response.use((response) => {
  return response.data;
});
