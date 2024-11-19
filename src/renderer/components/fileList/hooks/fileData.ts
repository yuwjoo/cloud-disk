import type { PropsType } from '../FileList.vue';
import type { MaybeRefOrGetter } from 'vue';

/**
 * @description: 文件数据项
 */
export interface FileItem<T = any> {
  name: string; // 名称
  size: number; // 大小
  type: 'file' | 'dir'; // 类型
  cover?: string; // 封面
  updatedTime: number; // 更新时间戳
  operate?: {
    download?: boolean; // 下载
    rename?: boolean; // 重命名
    delete?: boolean; // 删除
  }; // 操作
  raw?: T; // 原始数据
}

/**
 * @description: 处理文件数据-hook
 */
export function useFileData<ItemType>(
  list: MaybeRefOrGetter<PropsType<ItemType>['list']>,
  parseItem: PropsType<ItemType>['parseItem']
) {
  const fileList = ref<FileItem[]>([]); // 文件数据列表

  watchEffect(() => {
    fileList.value = toValue(list).map((item) => ({ ...parseItem(item), raw: item }));
  });

  return { fileList };
}
