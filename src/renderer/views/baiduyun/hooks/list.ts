import { getBaiduyunFileList } from '@/api/baiduyun';
import type { BaidunyunFileInfo } from '@/types/api/baiduyun';
import { onBeforeRouteUpdate, type RouteLocationNormalizedLoadedGeneric } from 'vue-router';

/**
 * @description: 筛选条件
 */
export interface Search {
  dir: string; // 目录路径
}

/**
 * @description: 列表逻辑-hook
 */
export function useList(route: RouteLocationNormalizedLoadedGeneric) {
  const search = reactive<Search>({
    dir: (route.query.path as string) || '/' // 目录路径
  });

  const list = ref<BaidunyunFileInfo[]>([]); // 文件列表

  const checkedList = ref<BaidunyunFileInfo[]>([]); // 选中数据列表

  const loading = ref<boolean>(false); // 加载中

  /**
   * @description: 刷新列表
   */
  const refreshList = async () => {
    loading.value = true;
    try {
      const res = await getBaiduyunFileList({ dir: search.dir, current: 1, size: 1000 });
      list.value = res.data.records || [];
    } catch (err) {
      /* empty */
    }
    loading.value = false;
  };

  onBeforeRouteUpdate((to) => {
    search.dir = (to.query.path as string) || '/';
    refreshList();
  });

  refreshList();

  return { search, list, checkedList, loading, refreshList };
}
