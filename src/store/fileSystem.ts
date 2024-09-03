import { defineStore } from 'pinia';

/**
 * @description: 文件系统管理
 */
export const useFileSystem = defineStore('fileSystem', () => {
  const searchValue = ref(''); // 模糊搜索值

  return { searchValue };
});
