import { useRouterStore } from "@/store/router";
import { useUserStore } from "@/store/user";
import type { Router } from "vue-router";

/**
 * @description: 初始化路由拦截
 */
export const initInterceptor = (router: Router) => {
  // 路由前缀拦截
  router.beforeEach((to) => {
    if (useUserStore().isLogin) {
      return true;
    } else if (!useRouterStore().whiteList.includes(to.name as string)) {
      return { name: "login" };
    }
  });
};
