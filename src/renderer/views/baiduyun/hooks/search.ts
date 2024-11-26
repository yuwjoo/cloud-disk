import { useRoute } from '@/hooks/vueRouter';
import { onBeforeRouteUpdate, type RouteLocationNormalizedLoadedGeneric } from 'vue-router';

/**
 * @description: 筛选条件
 */
export type Search = {
  dir: string; // 目录路径
};

/**
 * @description: 筛选逻辑-hook
 */
export function useSearch() {
  const search = reactive<Search>({
    dir: '/'
  });

  /**
   * @description: 初始化
   * @param {RouteLocationNormalizedLoadedGeneric} to 目标路由
   */
  const init = (to: RouteLocationNormalizedLoadedGeneric = useRoute()) => {
    search.dir = (to.query.path as string) || '/';
  };

  init();
  onBeforeRouteUpdate(init);

  return { search };
}
