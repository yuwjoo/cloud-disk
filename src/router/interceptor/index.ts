import type { RouteLocationNormalized, Router } from 'vue-router';

/**
 * @description: 添加路由拦截器
 * @param {Router} router 路由实例
 * @return {void}
 */
export function addRouterInterceptor(router: Router): void {
  // 路由进入前-全局拦截器
  router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    if (to === from) {
      return true;
    }
  });
}
