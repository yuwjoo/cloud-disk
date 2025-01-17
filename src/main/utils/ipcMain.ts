import { IpcC, IpcChannelMap, IpcEventMap } from 'common/types/ipc';
import { ipcMain, IpcMainInvokeEvent, WebContents, BrowserWindow } from 'electron';

type CallbackFun<T extends any[], K = unknown> = (
  event: IpcMainInvokeEvent,
  ...args: T
) => K | Promise<K>;
type IpcMainCallback<K> = K extends IpcC<infer P, infer R> ? CallbackFun<P, R> : never;

/**
 * @description: 带类型检查的 ipcMain on函数
 */
export function on<K extends keyof IpcChannelMap>(
  channel: K,
  callback: IpcMainCallback<IpcChannelMap[K]>
) {
  ipcMain.on(channel, callback);
}

/**
 * @description: 带类型检查的 ipcMain handle函数
 */
export function handle<K extends keyof IpcChannelMap>(
  channel: K,
  callback: IpcMainCallback<IpcChannelMap[K]>
) {
  ipcMain.handle(channel, callback);
}

/**
 * @description: 带类型检查的 WebContents send函数
 */
export function send<K extends keyof IpcEventMap>(
  sender: WebContents,
  channel: K,
  ...args: IpcEventMap[K]
) {
  sender.send(channel, ...args);
}

/**
 * @description: 对所有窗口发送广播
 */
export function broadcast<K extends keyof IpcEventMap>(
  sender: WebContents | null,
  channel: K,
  ...args: IpcEventMap[K]
) {
  BrowserWindow.getAllWindows().forEach((win) => {
    if (win.webContents.id !== sender?.id) {
      win.webContents.send(channel, ...args);
    }
  });
}
