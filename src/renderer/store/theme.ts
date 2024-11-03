import { defineStore } from 'pinia';

/**
 * @description: 主题-仓库
 */
export const useThemeStore = defineStore('theme', setup);

function setup() {
  const matchMedia = window.matchMedia('(prefers-color-scheme: dark)'); // 浏览器主题查询器
  const isDark = ref<boolean>(matchMedia.matches); // 是否深色模式

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
      toggleClass(darkMode);
      isDark.value = darkMode;
      return;
    }

    // 启动视图转换动画
    startViewTransitionFun(() => toggleClass(darkMode)).ready.then(() => {
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

  appendAnimationCss();
  toggleClass(isDark.value);
  matchMedia.addEventListener('change', (ev) => toggleClass(ev.matches));

  return { isDark, toggleDark };
}

/**
 * @description: 切换主题class
 * @param {boolean} [darkMode] 是否深色模式
 */
function toggleClass(darkMode: boolean) {
  document.documentElement.classList[darkMode ? 'add' : 'remove']('dark');
}

/**
 * @description: 添加动画样式
 */
function appendAnimationCss() {
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
