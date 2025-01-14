import { BrowserWindow } from 'electron';
import path from 'path';
import { send } from '@/utils/ipcMain';
import { isDevelopment } from '@/utils/env';

/**
 * @description: 创建窗口
 * @param {string} url 要加载的URL
 * @param {Electron.BrowserWindowConstructorOptions} options 窗口选项
 * @returns {BrowserWindow} 窗口对象
 */
export function createWindow(
  url: string = '/',
  options?: Electron.BrowserWindowConstructorOptions
): BrowserWindow {
  const window = new BrowserWindow({
    width: 1200,
    height: 900,
    titleBarStyle: 'hidden', // 隐藏原生标题栏
    titleBarOverlay: {
      color: 'rgb(250,250,250)',
      height: 35
    }, // 原生标题栏控制器样式
    webPreferences: {
      preload: path.join(__dirname, '../preload.js'),
      webSecurity: false, // 允许跨域
      devTools: isDevelopment
    },
    ...options
  });

  window.on('maximize', () => {
    send(window.webContents, 'window-change-maximize', true);
  });
  window.on('unmaximize', () => {
    send(window.webContents, 'window-change-maximize', false);
  });

  window.on('enter-full-screen', () => {
    send(window.webContents, 'window-change-full-screen', true);
  });
  window.on('leave-full-screen', () => {
    send(window.webContents, 'window-change-full-screen', false);
  });

  window.webContents.setWindowOpenHandler((details) => {
    createWindow(details.url, {
      x: window.getPosition()[0] + 40,
      y: window.getPosition()[1] + 40
    });
    return { action: 'deny' };
  }); // 打开新窗口处理逻辑

  if (isDevelopment) {
    window.loadURL(
      MAIN_WINDOW_VITE_DEV_SERVER_URL + `/#/desktopWindow?url=${encodeURIComponent(url)}`
    );
    window.webContents.openDevTools(); // 打开开发者工具
  } else {
    window.loadFile(path.join(__dirname, `../../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`), {
      hash: 'desktopWindow',
      query: { url: encodeURIComponent(url) }
    });
  }

  return window;
}
