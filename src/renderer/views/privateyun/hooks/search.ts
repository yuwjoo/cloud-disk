import { useRoute } from '@/hooks/vueRouter';
import { onBeforeRouteUpdate, type RouteLocationNormalizedLoadedGeneric } from 'vue-router';
import type { Search } from '../types';

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
