import { send } from '@/utils/ipcRenderer';
import { WindowApi } from 'common/types/electronApi';

export const window: WindowApi = {
  /**
   * @description: 窗口-最大化
   */
  maximize() {
    send('window-maximize');
  },

  /**
   * @description: 窗口-最小化
   */
  minimize() {
    send('window-minimize');
  },

  /**
   * @description: 窗口-还原
   */
  restore() {
    send('window-restore');
  },

  /**
   * @description: 窗口-关闭
   */
  close() {
    send('window-close');
  },

  /**
   * @description: 窗口-切换全屏状态
   */
  toggleFullScreen(isFull) {
    send('window-toggle-full-screen', isFull);
  },

  /**
   * @description: 窗口-是否最大化
   */
  isMaximize() {
    return send('window-is-maximize');
  },

  /**
   * @description: 窗口-是否全屏
   */
  isFullScreen: function () {
    return send('window-is-full-screen');
  }
};
