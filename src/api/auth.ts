import { useRequest } from '@/hooks/axios';
import type {
  ApiLoginRequest,
  ApiLoginResponse,
  ApiLogoutRequest,
  ApiLogoutResponse,
  ApiRegisterRequest,
  ApiRegisterResponse
} from '@/types/api/auth';

/**
 * @description: 注册账号
 */
export function register(data: ApiRegisterRequest): Promise<ApiRegisterResponse> {
  return useRequest({
    url: '/api/auth/register',
    method: 'post',
    data
  });
}

/**
 * @description: 登录账号
 */
export function login(data: ApiLoginRequest): Promise<ApiLoginResponse> {
  return useRequest({
    url: '/api/auth/login',
    method: 'post',
    data
  });
}

/**
 * @description: 登出账号
 */
export function logout(params: ApiLogoutRequest): Promise<ApiLogoutResponse> {
  return useRequest({
    url: '/api/auth/logout',
    method: 'get',
    params
  });
}
