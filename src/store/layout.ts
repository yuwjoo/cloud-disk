import { defineStore } from "pinia";

/**
 * @description: 布局-store
 */
export const useLayoutStore = defineStore("layout", () => {
  const isCollapsed = ref<boolean>(false); // 折叠侧边栏
  const searchValue = ref<string>(""); // 模糊搜索值

  /**
   * @description: 切换侧边栏展开状态
   * @param {boolean} collapsed 是否折叠
   */
  function toggleAside(collapsed: boolean = !isCollapsed.value) {
    isCollapsed.value = collapsed;
  }

  return { isCollapsed, searchValue, toggleAside };
});
