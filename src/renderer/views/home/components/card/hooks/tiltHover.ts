export type ElOption = HTMLElement | string | (() => HTMLElement);

export interface Options {
  container: ElOption; // 容器元素
  content: ElOption; // 内容元素
  background: ElOption; // 背景元素
}

/**
 * @description: 倾斜悬停效果
 */
export default function useTiltHover({ container, content, background }: Options) {
  const containerEl = getElement(container);
  const contentEl = getElement(content);
  const backgroundEl = getElement(background);

  let animationFrame: number; // 动画帧
  let containerRect: DOMRect; // 容器元素几何信息

  /**
   * @description: 处理鼠标进入
   */
  function handleMouseEnter() {
    containerRect = containerEl!.getBoundingClientRect();
  }

  /**
   * @description: 处理鼠标移动
   * @param {MouseEvent} ev 鼠标事件
   */
  function handleMouseMove(ev: MouseEvent) {
    useAnimationFrame(() => {
      const mouseX = ev.pageX - containerRect.left - containerRect.width / 2;
      const mouseY = ev.pageY - containerRect.top - containerRect.height / 2;

      const mouseRatioX = mouseX / containerRect.width;
      const mouseRatioY = mouseY / containerRect.height;

      const rX = mouseRatioX * 30;
      const rY = mouseRatioY * -30;

      contentEl!.style.transform = `rotateY(${rX}deg) rotateX(${rY}deg)`;

      const tX = mouseRatioX * -40;
      const tY = mouseRatioY * -40;

      backgroundEl!.style.transform = `translateX(${tX}px) translateY(${tY}px)`;
    });
  }

  /**
   * @description: 处理鼠标离开
   */
  function handleMouseLeave() {
    useAnimationFrame(() => {
      contentEl!.style.transform = `rotateY(${0}deg) rotateX(${0}deg)`;
      backgroundEl!.style.transform = `translateX(${0}px) translateY(${0}px)`;
    });
  }

  /**
   * @description: 使用动画帧
   * @param {() => void} callback 回调函数
   */
  function useAnimationFrame(callback: () => void) {
    window.cancelAnimationFrame(animationFrame);
    animationFrame = window.requestAnimationFrame(callback);
  }

  /**
   * @description: 获取HTML元素
   * @param {ElOption} val 数据
   * @return {HTMLElement | null} HTML元素
   */
  function getElement(val: ElOption): HTMLElement | null {
    if (typeof val === 'string') {
      return document.querySelector(val);
    }
    if (typeof val === 'function') {
      return val();
    }
    return val;
  }

  containerEl!.addEventListener('mouseenter', handleMouseEnter);
  containerEl!.addEventListener('mousemove', handleMouseMove);
  containerEl!.addEventListener('mouseleave', handleMouseLeave);
}
