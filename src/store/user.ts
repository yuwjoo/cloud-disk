import { defineStore } from 'pinia';
import type { LoginResData } from 'types/src/api/base';

/**
 * @description: 用户
 */
export const useUserStore = defineStore('user', () => {
  const user = ref<LoginResData['data']['user']>(JSON.parse(localStorage.getItem('user') || '{}')); // 用户信息

  /**
   * @description: 设置用户信息
   * @param {LoginResData['data']['user']} data 用户信息
   */
  function setUser(data: LoginResData['data']['user']) {
    user.value = data;
    localStorage.setItem('user', JSON.stringify(data));
  }

  return { user, setUser };
});
