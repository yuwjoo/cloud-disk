import type { NavigationGuardWithThis } from 'vue-router';

/**
 * @description: 路由前置拦截
 */
export const beforeEach: NavigationGuardWithThis<unknown> = (to) => {
  if (localStorage.getItem('token')) {
    return true;
  } else if (to.name !== 'login') {
    return { name: 'login' };
  }
};
