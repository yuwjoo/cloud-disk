import { useUserStore } from '@/store/user';
import type { NavigationGuardWithThis } from 'vue-router';

/**
 * @description: 路由前置拦截
 */
export const beforeEach: NavigationGuardWithThis<unknown> = (to) => {
  if (useUserStore().isLogin) {
    return true;
  } else if (to.name !== 'login') {
    return { name: 'login' };
  }
};
