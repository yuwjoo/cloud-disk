import { defineStore } from 'pinia';
import { useDark, useToggle } from '@vueuse/core';

export const useThemeStore = defineStore('theme', () => {
  const isDark = useDark(); // 是否深色模式
  const toggleDark = useToggle(isDark); // 切换函数

  return { isDark, toggleDark };
});
