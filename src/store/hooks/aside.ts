import { defineStore } from 'pinia';

export const useAsideStore = defineStore('aside', () => {
  const isCollapse = ref<boolean>(false); // 是否折叠侧边栏

  /**
   * @description: 切换折叠侧边栏
   * @param {boolean} is 是否折叠
   */
  function toggleCollapse(is: boolean) {
    isCollapse.value = is ?? !isCollapse.value;
  }

  return { isCollapse, toggleCollapse };
});
