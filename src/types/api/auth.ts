import type { CommonResponse } from '@/types/request';
import type { UserInfo } from '@/types/user';

/**
 * @description: 注册账号-请求参数
 */
export type ApiRegisterRequest = {
  account: string; // 账号
  password: string; // 密码
  nickname: string; // 昵称
};

/**
 * @description: 注册账号-响应数据
 */
export type ApiRegisterResponse = CommonResponse;

/**
 * @description: 登录账号-请求参数
 */
export type ApiLoginRequest = {
  account: string; // 账号
  password: string; // 密码
};

/**
 * @description: 登录账号-响应数据
 */
export type ApiLoginResponse = CommonResponse<{
  token: string;
  user: UserInfo;
}>;

/**
 * @description: 登出账号-请求参数
 */
export type ApiLogoutRequest = void;

/**
 * @description: 登出账号-响应数据
 */
export type ApiLogoutResponse = CommonResponse;
