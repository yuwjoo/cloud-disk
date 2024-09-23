import type { ApiLogin } from '@/api/types/auth';
import type { Entity } from '@/types/entity';
import { defineStore } from 'pinia';
import { login as apiLogin, logout as apiLogout } from '@/api/auth';
import { useRouter } from '@/librarys/vue-router';

/**
 * @description: 用户-仓库
 */
export const useUserStore = defineStore('user', setup);

function setup() {
  const user = ref<Entity.User>(JSON.parse(localStorage.getItem('user') || '{}')); // 用户信息
  const token = ref<string>(localStorage.getItem('token') || ''); // token

  /**
   * @description: 登录
   * @param {ApiLogin.Request} data 登录参数
   */
  const login = async (data: ApiLogin.Request) => {
    const res = await apiLogin(data);
    user.value = res.data.user;
    token.value = res.data.token;
    localStorage.setItem('user', JSON.stringify(user.value));
    localStorage.setItem('token', JSON.stringify(token.value));
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

  return { user: readonly(user), token: readonly(token), login, logout };
}
