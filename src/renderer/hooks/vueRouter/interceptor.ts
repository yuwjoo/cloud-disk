import { useRouterStore } from '@/store/router';
import { useUserStore } from '@/store/user';
import type { NavigationGuardWithThis } from 'vue-router';

/**
 * @description: 路由前置拦截
 */
export const beforeEach: NavigationGuardWithThis<unknown> = (to) => {
  console.log({ to });
  if (useUserStore().isLogin) {
    return true;
  } else if (!useRouterStore().whiteList.includes(to.name as string)) {
    return { name: 'login' };
  }
};
