export interface IpcC<P extends any[] = [], R = void> {
  params: P;
  result: R;
}

/**
 * @description: IPC事件集合
 */
export interface IpcEventMap {
  'window-change-maximize': [isMaximize: boolean]; // 窗口-监听最大化改变
  'window-change-full-screen': [isFullScreen: boolean]; // 窗口-监听全屏改变
}

/**
 * @description: IPC通道集合
 */
export interface IpcChannelMap {
  'window-maximize': IpcC; // 窗口-最大化
  'window-minimize': IpcC; // 窗口-最小化
  'window-restore': IpcC; // 窗口-还原
  'window-close': IpcC; // 窗口-还原
  'window-toggle-full-screen': IpcC<[isFull?: boolean]>; // 窗口-切换全屏状态
  'window-is-maximize': IpcC<[], boolean>; // 窗口-是否最大化
  'window-is-full-screen': IpcC<[], boolean>; // 窗口-是否全屏
}
