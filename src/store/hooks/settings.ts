import { defineStore } from 'pinia';
import type { Settings } from 'types/src/store/settings';

export const useSettingsStore = defineStore('settings', () => {
  const defaultSettings: Settings = {
    theme: {
      mode: 'followSystem'
    }
  };
  const settings = ref<Settings>(
    JSON.parse(localStorage.getItem('settings') || JSON.stringify(defaultSettings))
  );

  /**
   * @description: 更新设置
   * @param {K} module 设置模块名
   * @param {Partial<Settings[K]>} config 新的配置
   */
  function updateSettings<K extends keyof Settings>(module: K, config: Partial<Settings[K]>) {
    settings.value[module] = { ...settings.value[module], ...config };
    localStorage.setItem('settings', JSON.stringify(settings.value));
  }

  return { settings: readonly(settings), updateSettings };
});
