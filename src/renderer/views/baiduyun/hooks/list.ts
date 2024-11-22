import { getList } from '@/api/baiduyun';
import { useLoadingFetch } from '@/hooks/common';
import { useRoute } from '@/hooks/vueRouter';
import type { ApiGetListResponse } from '@/types/api/baiduyun';
import { onBeforeRouteUpdate } from 'vue-router';

/**
 * @description: 筛选条件
 */
export interface Search {
  dir: string; // 目录路径
}

/**
 * @description: 列表逻辑-hook
 */
export function useList() {
  const route = useRoute();

  const search = reactive<Search>({
    dir: <string>route.query.path || '/' // 目录路径
  });

  const list = ref<ApiGetListResponse['list']>([]); // 文件列表

  const [loading, refreshList] = useLoadingFetch(async () => {
    try {
      const res = await getList({
        dir: search.dir,
        page: 1,
        num: 1000
      });
      list.value = res.list || [];
    } catch {
      /* empty */
    }
  });

  const checkedList = ref<ApiGetListResponse['list']>([]); // 选中数据列表

  onBeforeRouteUpdate((to) => {
    search.dir = <string>to.query.path || '/';
    refreshList();
  });

  return { search, list, checkedList, loading, refreshList };
}
