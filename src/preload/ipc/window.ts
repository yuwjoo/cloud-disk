import {
  WINDOW_CLOSE,
  WINDOW_MAXIMIZE,
  WINDOW_MINIMIZE,
  WINDOW_RESTORE
} from 'common/ipc-constants';
import { WindowApi } from 'common/types/electron-api';
import { ipcRenderer } from 'electron';

export const window: WindowApi = {
  /**
   * @description: 窗口-最大化
   */
  maximize() {
    ipcRenderer.send(WINDOW_MAXIMIZE);
  },

  /**
   * @description: 窗口-最小化
   */
  minimize() {
    ipcRenderer.send(WINDOW_MINIMIZE);
  },

  /**
   * @description: 窗口-还原
   */
  restore() {
    ipcRenderer.send(WINDOW_RESTORE);
  },

  /**
   * @description: 窗口-关闭
   */
  close() {
    ipcRenderer.send(WINDOW_CLOSE);
  },

  /**
   * @description: 窗口-切换全屏状态
   * @param {boolean} isFull 是否全屏
   */
  toggleFullScreen(isFull) {
    ipcRenderer.send(WINDOW_CLOSE, isFull);
  }
};
