import { useRequest } from '@/library/axios';
import type { ApiLogin, ApiLogout, ApiRegister } from './types/auth';

/**
 * @description: 注册账号
 */
export function register(data: ApiRegister.Request): Promise<ApiRegister.Response> {
  return useRequest({
    url: '/api/auth/register',
    method: 'post',
    data
  });
}

/**
 * @description: 登录账号
 */
export function login(data: ApiLogin.Request): Promise<ApiLogin.Response> {
  return useRequest({
    url: '/api/auth/login',
    method: 'post',
    data
  });
}

/**
 * @description: 登出账号
 */
export function logout(): Promise<ApiLogout.Response> {
  return useRequest({
    url: '/api/auth/logout',
    method: 'get'
  });
}
