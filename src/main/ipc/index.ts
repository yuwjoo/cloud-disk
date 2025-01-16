import { on } from '@/utils/ipcMain';
import { BrowserWindow } from 'electron';

/**
 * @description: 窗口-最大化
 */
on('window-maximize', (event) => {
  BrowserWindow.fromWebContents(event.sender)?.maximize();
});

/**
 * @description: 窗口-最小化
 */
on('window-minimize', (event) => {
  BrowserWindow.fromWebContents(event.sender)?.minimize();
});

/**
 * @description: 窗口-还原
 */
on('window-restore', (event) => {
  BrowserWindow.fromWebContents(event.sender)?.restore();
});

/**
 * @description: 窗口-关闭
 */
on('window-close', (event) => {
  BrowserWindow.fromWebContents(event.sender)?.close();
});

/**
 * @description: 窗口-切换全屏状态
 * @param {boolean} isFull 是否全屏
 */
on('window-toggle-full-screen', (event, isFull) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win) return;
  win.setFullScreen(isFull ?? !win.isFullScreen());
});

/**
 * @description: 窗口-是否最大化
 */
on('window-is-maximize', (event) => {
  return BrowserWindow.fromWebContents(event.sender)?.isMaximized() || false;
});

/**
 * @description: 窗口-是否全屏
 */
on('window-is-full-screen', (event) => {
  return BrowserWindow.fromWebContents(event.sender)?.isFullScreen() || false;
});
