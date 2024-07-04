import { defineStore } from 'pinia';
import type { Settings } from 'types/src/store/settings';

export const useSettingsStore = defineStore('settings', () => {
  const defaultSettings: Settings = {
    aside: {
      isCollapsed: true
    },
    theme: {
      mode: 'followSystem'
    }
  }; // 默认设置
  const settings = ref<Settings>(JSON.parse(localStorage.getItem('settings')!) || defaultSettings); // 当前设置

  /**
   * @description: 保存设置
   * @param {Settings} config 设置配置
   */
  function saveSettings(config: Settings | Ref<Settings> = settings) {
    const configStr = JSON.stringify(toValue(config));
    localStorage.setItem('settings', configStr);
    settings.value = JSON.parse(configStr);
  }

  return { settings, saveSettings };
});
