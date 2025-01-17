import { app, BrowserWindow } from 'electron';
import { BrowserWindowManager } from './BrowserWindowManager';

export let browserWindowManager: BrowserWindowManager; // 窗口管理器

app.on('ready', () => {
  browserWindowManager = new BrowserWindowManager('/');
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    browserWindowManager = new BrowserWindowManager('/');
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
