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
  blog: BlogApi; // 博客api
  file: FileApi; // 文件api
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

/**
 * @description: 博客api
 */
export interface BlogApi {
  list: IpcInvokeFun<'blog-list'>; // 博客-获取列表
  add: IpcInvokeFun<'blog-add'>; // 博客-新增
  update: IpcInvokeFun<'blog-update'>; // 博客-更新
  delete: IpcInvokeFun<'blog-delete'>; // 博客-删除
}

/**
 * @description: 文件api
 */
export interface FileApi {
  readFile: IpcInvokeFun<'read-file'>; // 读取文件
  writeFile: IpcInvokeFun<'write-file'>; // 写入文件
  deleteFile: IpcInvokeFun<'delete-file'>; // 删除文件
  moveFile: IpcInvokeFun<'move-file'>; // 移动文件
}
