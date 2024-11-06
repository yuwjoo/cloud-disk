import {
  WINDOW_MAXIMIZE,
  WINDOW_MINIMIZE,
  WINDOW_RESTORE,
  WINDOW_CLOSE
} from 'common/ipc-constants';
import { BrowserWindow, ipcMain } from 'electron';

/**
 * @description: 窗口-最大化
 */
ipcMain.on(WINDOW_MAXIMIZE, (event) => {
  BrowserWindow.fromWebContents(event.sender)?.maximize();
});

/**
 * @description: 窗口-最小化
 */
ipcMain.on(WINDOW_MINIMIZE, (event) => {
  BrowserWindow.fromWebContents(event.sender)?.minimize();
});

/**
 * @description: 窗口-还原
 */
ipcMain.on(WINDOW_RESTORE, (event) => {
  BrowserWindow.fromWebContents(event.sender)?.restore();
});

/**
 * @description: 窗口-关闭
 */
ipcMain.on(WINDOW_CLOSE, (event) => {
  BrowserWindow.fromWebContents(event.sender)?.close();
});

/**
 * @description: 窗口-切换全屏状态
 * @param {boolean} isFull 是否全屏
 */
ipcMain.on(WINDOW_CLOSE, (event, isFull?: boolean) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win) return;
  win.setFullScreen(isFull ?? !win.isFullScreen());
});
