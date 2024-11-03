import { defineStore } from 'pinia';

/**
 * @description: 路由-仓库
 */
export const useRouterStore = defineStore('router', setup);

function setup() {
  const whiteList = ref<string[]>(['login', 'notFound']); // 路由白名单

  return {
    whiteList: readonly(whiteList)
  };
}
