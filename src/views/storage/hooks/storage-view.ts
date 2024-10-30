import { getFileList } from '@/api/common/storage';
import { useLayoutStore } from '@/store/layout';
import { useUserStore } from '@/store/user';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import type { Search } from '../types/storage-view';
import type { FileInfo } from '@/types/file';

/**
 * @description: 获取筛选数据
 */
export function useSearch() {
  const search = reactive<Search>({
    parent: (useRoute().query.path as string) || useUserStore().user?.storageOrigin || '', // 父级路径
    searchValue: '' // 模糊搜索值
  });

  onBeforeRouteUpdate((to) => {
    search.parent = (to.query.path as string) || useUserStore().user?.storageOrigin || '';
  });

  watchEffect(() => {
    search.searchValue = useLayoutStore().searchValue;
  });

  return { search };
}

/**
 * @description: 获取列表数据
 */
export function useFetchList(search: Search) {
  const list = ref<FileInfo[]>([]); // 文件列表
  const loading = ref<boolean>(false); // 加载中

  /**
   * @description: 刷新列表
   */
  async function refreshList() {
    loading.value = true;
    try {
      const res = await getFileList({ parent: search.parent });
      list.value = res.data.records || [];
    } catch (err) {
      /* empty */
    }
    loading.value = false;
  }

  watchEffect(refreshList);

  return { list, loading, refreshList };
}
