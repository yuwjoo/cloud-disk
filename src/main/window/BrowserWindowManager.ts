import { send } from '@/utils/ipcMain';
import { IS_DEVELOPMENT, PRELOAD_PATH } from '@/utils/constant';
import { BrowserWindow } from 'electron';

export class BrowserWindowManager {
  mainWindow: BrowserWindow;

  constructor(target: string, options?: Electron.BrowserWindowConstructorOptions) {
    this.mainWindow = new BrowserWindow({
      width: 1200,
      height: 900,
      titleBarStyle: 'hidden', // 隐藏原生标题栏
      titleBarOverlay: {
        color: 'rgb(250,250,250)',
        height: 35
      }, // 原生标题栏控制器样式
      webPreferences: {
        preload: PRELOAD_PATH,
        webSecurity: true, // 安全网络 (禁止跨域)
        devTools: IS_DEVELOPMENT
      },
      ...options
    });

    // 最大最小化事件
    this.mainWindow.on('maximize', () => {
      send(this.mainWindow.webContents, 'window-change-maximize', true);
    });
    this.mainWindow.on('unmaximize', () => {
      send(this.mainWindow.webContents, 'window-change-maximize', false);
    });

    // 全屏事件
    this.mainWindow.on('enter-full-screen', () => {
      send(this.mainWindow.webContents, 'window-change-full-screen', true);
    });
    this.mainWindow.on('leave-full-screen', () => {
      send(this.mainWindow.webContents, 'window-change-full-screen', false);
    });

    // 打开新窗口处理逻辑
    this.mainWindow.webContents.setWindowOpenHandler((details) => {
      const [x, y] = this.mainWindow.getPosition();
      new BrowserWindowManager(details.url, { x: x + 40, y: y + 40 });
      return { action: 'deny' };
    });

    if (IS_DEVELOPMENT) {
      this.mainWindow.loadURL(
        `${MAIN_WINDOW_VITE_DEV_SERVER_URL}/desktopWindow?target=${encodeURIComponent(target)}`
      );
      this.mainWindow.webContents.openDevTools(); // 打开开发者工具
    } else {
      this.mainWindow.loadURL(
        `renderer://${MAIN_WINDOW_VITE_NAME}/desktopWindow?target=${encodeURIComponent(target)}`
      );
    }
  }
}
