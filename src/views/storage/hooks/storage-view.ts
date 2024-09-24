import { getFileList } from '@/api/storage';
import { useLayoutStore } from '@/store/layout';
import { useUserStore } from '@/store/user';
import type { FileInfo } from '@/api/types/storage';
import type { Search } from '../types/storage-view';

/**
 * @description: 获取筛选数据
 */
export function useSearch() {
  const search = reactive<Search>({
    parent: useUserStore().user.storageOrigin, // 父级路径
    searchValue: '' // 模糊搜索值
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

  watchEffect(async () => {
    loading.value = true;
    try {
      const res = await getFileList({ parent: search.parent });
      list.value = res.data.records || [];
    } catch (err) {
      /* empty */
    }
    loading.value = false;
  });

  return { list, loading };
}
