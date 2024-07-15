import routes from '@/router';
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteLocationNormalized, Router } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

addRouterInterceptor(router);

/**
 * @description: 添加路由拦截器
 * @param {Router} router 路由实例
 * @return {void}
 */
export function addRouterInterceptor(router: Router): void {
  // 路由进入前-全局拦截器
  router.beforeEach((to: RouteLocationNormalized) => {
    if (localStorage.getItem('token')) {
      return true;
    } else if (to.name !== 'login') {
      return { name: 'login' };
    }
  });
}

export default router;
