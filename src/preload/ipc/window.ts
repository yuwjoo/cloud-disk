import {
  WINDOW_CLOSE,
  WINDOW_MAXIMIZE,
  WINDOW_MINIMIZE,
  WINDOW_RESTORE
} from 'common/ipc-constants';
import { ipcRenderer } from 'electron';

/**
 * @description: 窗口-最大化
 */
export function maximize() {
  ipcRenderer.send(WINDOW_MAXIMIZE);
}

/**
 * @description: 窗口-最小化
 */
export function minimize() {
  ipcRenderer.send(WINDOW_MINIMIZE);
}

/**
 * @description: 窗口-还原
 */
export function restore() {
  ipcRenderer.send(WINDOW_RESTORE);
}

/**
 * @description: 窗口-关闭
 */
export function close() {
  ipcRenderer.send(WINDOW_CLOSE);
}

/**
 * @description: 窗口-切换全屏状态
 * @param {boolean} isFull 是否全屏
 */
export function toggleFullScreen(isFull?: boolean) {
  ipcRenderer.send(WINDOW_CLOSE, isFull);
}
