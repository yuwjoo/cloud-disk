import { IpcChannelMap, IpcEventMap } from 'common/types/ipc';
import { ipcRenderer, IpcRendererEvent } from 'electron';

type IpcRendererCallback<T extends any[]> = (event: IpcRendererEvent, ...args: T) => void;

/**
 * @description: 带类型检查的 ipcRenderer send函数
 */
export function send<K extends keyof IpcChannelMap>(
  channel: K,
  ...args: IpcChannelMap[K]['params']
): IpcChannelMap[K]['result'] {
  return ipcRenderer.send(channel, ...args);
}

/**
 * @description: 带类型检查的 ipcRenderer invoke函数
 */
export function invoke<K extends keyof IpcChannelMap>(
  channel: K,
  ...args: IpcChannelMap[K]['params']
): IpcChannelMap[K]['result'] {
  return ipcRenderer.invoke(channel, ...args);
}

/**
 * @description: 带类型检查的 ipcRenderer on函数
 */
export function on<K extends keyof IpcEventMap>(
  channel: K,
  callback: IpcRendererCallback<IpcEventMap[K]>
): void {
  ipcRenderer.on(channel, callback);
}
