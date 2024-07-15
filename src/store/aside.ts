import { defineStore, storeToRefs } from 'pinia';
import { useSettingsStore } from './settings';

/**
 * @description: 侧边栏控制
 */
export const useAsideStore = defineStore('aside', () => {
  const { settings } = storeToRefs(useSettingsStore());
  const isCollapsed = computed(() => settings.value.aside.isCollapsed); // 是否折叠

  const { saveSettings } = useSettingsStore();

  /**
   * @description: 切换侧边栏
   * @param {boolean} is 是否折叠
   */
  function toggleAside(is: boolean = !isCollapsed.value) {
    settings.value.aside.isCollapsed = is;
    saveSettings();
  }

  return { isCollapsed, toggleAside };
});
