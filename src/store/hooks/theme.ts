import { defineStore } from 'pinia';
import { useSettingsStore } from './settings';

export const useThemeStore = defineStore('theme', () => {
  const { mode } = toRef(useSettingsStore().settings.theme);
  const systemIsDark = listenerSystemTheme();
  const isDark = computed(() => {
    return mode.value === 'followSystem' ? systemIsDark.value : mode.value === 'dark';
  });

  const { saveSettings } = useSettingsStore();

  watchEffect(() => {
    toggleHtmlClass(isDark.value);
  });

  /**
   * @description: 监听系统主题
   * @return {Ref<boolean>} 是否深色模式
   */
  function listenerSystemTheme(): Ref<boolean> {
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
    const systemIsDark = ref<boolean>(matchMedia.matches); // 系统是深色模式
    matchMedia.addEventListener('change', (ev) => (systemIsDark.value = ev.matches));
    return systemIsDark;
  }

  /**
   * @description: 切换深色模式
   * @param {MouseEvent} event 鼠标事件
   * @param {boolean} darkMode 深色模式
   */
  function toggleDark(event: MouseEvent, darkMode: boolean = !isDark.value) {
    const { clientX: x, clientY: y } = event;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`];
    // @ts-ignore
    const startViewTransitionFun = document.startViewTransition?.bind(document);

    if (!startViewTransitionFun) {
      toggleHtmlClass(darkMode);
      return;
    }

    startViewTransitionFun(() => toggleHtmlClass(darkMode)).ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: darkMode ? clipPath : [...clipPath].reverse()
        },
        {
          duration: 500,
          easing: 'ease-in',
          pseudoElement: darkMode ? '::view-transition-new(root)' : '::view-transition-old(root)'
        }
      );
      isDark.value = darkMode;
    });
  }

  /**
   * @description: 切换html类名
   * @param {boolean} darkMode 深色模式
   */
  function toggleHtmlClass(darkMode: boolean) {
    document.documentElement.classList.remove(darkMode ? 'light' : 'dark');
    document.documentElement.classList.add(darkMode ? 'dark' : 'light');
  }

  return { isDark, toggleDark };
});
