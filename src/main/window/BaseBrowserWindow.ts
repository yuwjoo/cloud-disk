import { send } from '@/utils/ipcMain';
import { IS_DEVELOPMENT, PRELOAD_PATH } from '@/utils/constant';
import { BrowserWindow } from 'electron';

export class BaseBrowserWindow extends BrowserWindow {
  constructor(target: string, options?: Electron.BrowserWindowConstructorOptions) {
    super({
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

    this.#initListener();

    // 打开新窗口处理逻辑
    this.webContents.setWindowOpenHandler((details) => {
      const [x, y] = this.getPosition();
      new BaseBrowserWindow(details.url, { x: x + 40, y: y + 40 });
      return { action: 'deny' };
    });

    if (IS_DEVELOPMENT) {
      this.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/desktopWindow?target=${target}`);
      this.webContents.openDevTools(); // 打开开发者工具
    } else {
      this.loadURL(`renderer://${MAIN_WINDOW_VITE_NAME}/desktopWindow?target=${target}`);
    }
  }

  /**
   * @description: 初始化事件监听
   */
  #initListener() {
    // 最大最小化事件
    this.on('maximize', () => {
      send(this.webContents, 'window-change-maximize', true);
    });
    this.on('unmaximize', () => {
      send(this.webContents, 'window-change-maximize', false);
    });

    // 全屏事件
    this.on('enter-full-screen', () => {
      send(this.webContents, 'window-change-full-screen', true);
    });
    this.on('leave-full-screen', () => {
      send(this.webContents, 'window-change-full-screen', false);
    });
  }
}
