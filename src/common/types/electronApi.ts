import { IpcRendererEvent } from 'electron';
import { IpcChannelMap, IpcEventMap } from './ipc';

/**
 * @description: electron api
 */
export interface ElectronApi {
  desktop: boolean; // 是否桌面端
  version: string; // electron版本
  addListener: AddListener; // 监听事件
  removeListener: RemoveListener; // 移除事件
  removeAllListener: RemoveAllListener; // 移除所有事件
  window: WindowApi; // 窗口api
}

/**
 * @description: 监听器配置项
 */
export interface ListenerOptions {
  once?: boolean; // 一次性监听器
}

/**
 * @description: 添加事件函数
 */
export interface AddListener {
  <K extends keyof IpcEventMap>(
    name: K,
    callback: (event: IpcRendererEvent, ...args: IpcEventMap[K]) => void,
    options?: ListenerOptions
  ): void;
}

/**
 * @description: 移除事件函数
 */
export interface RemoveListener {
  <K extends keyof IpcEventMap>(
    name: K,
    callback: (event: IpcRendererEvent, ...args: IpcEventMap[K]) => void
  ): void;
}

/**
 * @description: 移除所有事件函数
 */
export interface RemoveAllListener {
  <K extends keyof IpcEventMap>(name: K): void;
}

export type IpcSendFun<K extends keyof IpcChannelMap> = (
  ...args: IpcChannelMap[K]['params']
) => IpcChannelMap[K]['result'];

export type IpcInvokeFun<K extends keyof IpcChannelMap> = (
  ...args: IpcChannelMap[K]['params']
) => Promise<IpcChannelMap[K]['result']>;

/**
 * @description: 窗口api
 */
export interface WindowApi {
  maximize: IpcSendFun<'window-maximize'>; // 最大化
  minimize: IpcSendFun<'window-minimize'>; // 最小化
  restore: IpcSendFun<'window-restore'>; // 还原
  close: IpcSendFun<'window-close'>; // 关闭
  toggleFullScreen: IpcSendFun<'window-toggle-full-screen'>; // 切换全屏状态
  isMaximize: IpcSendFun<'window-is-maximize'>; // 是否最大化
  isFullScreen: IpcSendFun<'window-is-full-screen'>; // 是否全屏
}
