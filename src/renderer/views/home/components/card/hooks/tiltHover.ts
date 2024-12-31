export type ElOption = HTMLElement | string | (() => HTMLElement);

export interface Options {
  container: ElOption; // 容器元素
  content?: ElOption; // 内容元素
  background?: ElOption; // 背景元素
  maxRotate?: number; // 最大测斜角度（内容元素）
  maxTranslate?: number; // 最大平移距离（背景元素）
  onPostion?: (position: Position) => void; // 监听位置改变
}

export interface Position {
  rx: number; // x测斜角度
  ry: number; // y测斜角度
  tx: number; // x平移角度
  ty: number; // y平移角度
}

/**
 * @description: 倾斜悬停效果
 */
export default function useTiltHover({
  container,
  content,
  background,
  maxRotate = 7.5,
  maxTranslate = 20,
  onPostion
}: Options) {
  const containerEl = queryHTMLElement(container);
  const contentEl = queryHTMLElement(content);
  const backgroundEl = queryHTMLElement(background);

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
      const moveX = ev.pageX - containerRect.left - containerRect.width / 2; // 鼠标x轴移动距离（从元素中心点计算）
      const moveY = ev.pageY - containerRect.top - containerRect.height / 2; // 鼠标y轴移动距离（从元素中心点计算）

      const moveRatioX = (moveX / containerRect.width) * 2; // 移动距离比例
      const moveRatioY = (moveY / containerRect.height) * 2; // 移动距离比例

      const rx = moveRatioX * maxRotate; // 测斜角度
      const ry = moveRatioY * -maxRotate; // 测斜角度

      const tx = moveRatioX * -maxTranslate; // 平移距离
      const ty = moveRatioY * -maxTranslate; // 平移距离

      if (contentEl) contentEl.style.transform = `rotateY(${rx}deg) rotateX(${ry}deg)`;
      if (backgroundEl) backgroundEl.style.transform = `translateX(${tx}px) translateY(${ty}px)`;

      if (onPostion) onPostion({ rx, ry, tx, ty });
    });
  }

  /**
   * @description: 处理鼠标离开
   */
  function handleMouseLeave() {
    useAnimationFrame(() => {
      if (contentEl) contentEl.style.transform = `rotateY(${0}deg) rotateX(${0}deg)`;
      if (backgroundEl) backgroundEl.style.transform = `translateX(${0}px) translateY(${0}px)`;
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
   * @description: 查找HTML元素
   * @param {ElOption} val 数据
   * @return {HTMLElement | null} HTML元素
   */
  function queryHTMLElement(val?: ElOption): HTMLElement | null {
    if (typeof val === 'string') {
      return document.querySelector(val);
    }
    if (typeof val === 'function') {
      return val();
    }
    return val ?? null;
  }

  if (!containerEl) throw new Error('container not found');

  containerEl.addEventListener('mouseenter', handleMouseEnter);
  containerEl.addEventListener('mousemove', handleMouseMove);
  containerEl.addEventListener('mouseleave', handleMouseLeave);
}
