import { defineStore } from 'pinia';
import { login as apiLogin, logout as apiLogout } from '@/api/common/auth';
import { useRouter } from '@/library/vue-router';
import type { UserInfo } from '@/types/user';
import type { ApiLoginRequest } from '@/types/api/common/auth';

/**
 * @description: 用户-仓库
 */
export const useUserStore = defineStore('user', setup);

function setup() {
  const user = ref<UserInfo>(JSON.parse(localStorage.getItem('user') || '{}')); // 用户信息
  const token = ref<string>(localStorage.getItem('token') || ''); // token
  const isLogin = computed<boolean>(() => !!token.value); // 是否已经登录

  /**
   * @description: 登录
   * @param {ApiLoginRequest} data 登录参数
   */
  const login = async (data: ApiLoginRequest) => {
    const res = await apiLogin(data);
    user.value = res.data.user;
    token.value = res.data.token;
    localStorage.setItem('user', JSON.stringify(user.value));
    localStorage.setItem('token', token.value);
    useRouter().replace('/');
  };

  /**
   * @description: 登出
   */
  const logout = async () => {
    apiLogout();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    useRouter().replace('/login');
  };

  return {
    user: readonly(user),
    token: readonly(token),
    isLogin: readonly(isLogin),
    login,
    logout
  };
}
