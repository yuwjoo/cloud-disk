import { defineStore, storeToRefs } from 'pinia';
import { useSettingsStore } from './settings';

/**
 * @description: 主题-仓库
 */
export const useThemeStore = defineStore('theme', setup);

function setup() {
  const isDark = computedIsDark(listenerSystemIsDark()); // 是否深色模式

  insertTransitionCSS();

  watchEffect(() => toggleHtmlClass(isDark.value));

  /**
   * @description: 监听系统是否深色模式
   * @return {Ref<boolean>} 是否深色模式
   */
  function listenerSystemIsDark(): Ref<boolean> {
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
    const systemIsDark = ref<boolean>(matchMedia.matches); // 系统是深色模式

    matchMedia.addEventListener('change', (ev) => (systemIsDark.value = ev.matches));
    return systemIsDark;
  }

  /**
   * @description: 计算是否是深色模式
   * @param {Ref<boolean>} systemIsDark 系统是否深色模式
   * @return {Ref<boolean>} 是否深色模式
   */
  function computedIsDark(systemIsDark: Ref<boolean>): Ref<boolean> {
    const { settings } = storeToRefs(useSettingsStore());
    const { saveSettings } = useSettingsStore();

    return computed({
      get: () => {
        if (settings.value.theme.mode === 'followSystem') {
          return systemIsDark.value;
        } else {
          return settings.value.theme.mode === 'dark';
        }
      },
      set: (val) => {
        settings.value.theme.mode = val ? 'dark' : 'light';
        saveSettings();
      }
    });
  }

  /**
   * @description: 切换深色模式
   * @param {MouseEvent} event 鼠标事件
   * @param {boolean} [darkMode] 可选参数，指定是否启用深色模式。如果未指定，则使用相反的模式。
   */
  function toggleDark(event: MouseEvent, darkMode: boolean = !isDark.value) {
    const { clientX: x, clientY: y } = event;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`];
    const startViewTransitionFun = (document as any).startViewTransition?.bind(document);

    // 兼容低版本浏览器，不做动画处理，直接切换模式
    if (!startViewTransitionFun) {
      isDark.value = darkMode;
      return;
    }

    // 启动视图转换动画
    startViewTransitionFun(() => toggleHtmlClass(darkMode)).ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: darkMode ? clipPath : clipPath.reverse()
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
   * @description: 切换 HTML 类名
   * @param {boolean} darkMode 是否深色模式
   */
  function toggleHtmlClass(darkMode: boolean) {
    const classList = document.documentElement.classList;
    if (darkMode) {
      classList.add('dark');
      classList.remove('light');
    } else {
      classList.add('light');
      classList.remove('dark');
    }
  }

  /**
   * @description: 插入动画样式
   */
  function insertTransitionCSS() {
    const styleElement = document.createElement('style');

    styleElement.textContent = `
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }
  
        .dark::view-transition-old(root) {
          z-index: 1;
        }
  
        .dark::view-transition-new(root) {
          z-index: 999;
        }
  
        ::view-transition-old(root) {
          z-index: 999;
        }
  
        ::view-transition-new(root) {
          z-index: 1;
        }
      `;

    document.head.appendChild(styleElement);
  }

  return { isDark, toggleDark };
}
