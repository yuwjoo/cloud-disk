import { defineStore } from "pinia";

/**
 * @description: 路由-store
 */
export const useRouterStore = defineStore("router", () => {
  const whiteList = ref<string[]>(["login", "notFound", "desktopWindow"]); // 路由白名单

  return {
    whiteList: readonly(whiteList)
  };
});
