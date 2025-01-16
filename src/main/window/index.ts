import { app, BrowserWindow } from 'electron';
import { BaseBrowserWindow } from './BaseBrowserWindow';

export let mainWindow: BrowserWindow; // 主窗口

app.on('ready', () => {
  mainWindow = new BaseBrowserWindow('/');
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    mainWindow = new BaseBrowserWindow('/');
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
