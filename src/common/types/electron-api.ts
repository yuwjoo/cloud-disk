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
  baiduyun: BaiduyunApi; // 百度云api
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

export type IpcRequestFun<K extends keyof IpcChannelMap> = (
  ...args: IpcChannelMap[K]['params']
) => IpcChannelMap[K]['result'];

/**
 * @description: 窗口api
 */
export interface WindowApi {
  maximize: IpcRequestFun<'window-maximize'>; // 最大化
  minimize: IpcRequestFun<'window-minimize'>; // 最小化
  restore: IpcRequestFun<'window-restore'>; // 还原
  close: IpcRequestFun<'window-close'>; // 关闭
  toggleFullScreen: IpcRequestFun<'window-toggle-full-screen'>; // 切换全屏状态
}

/**
 * @description: 百度云api
 */
export interface BaiduyunApi {
  searchFile: IpcRequestFun<'baiduyun-search-file'>; // 模糊查询文件
  getList: IpcRequestFun<'baiduyun-get-list'>; // 获取列表数据
  createDir: IpcRequestFun<'baiduyun-create-dir'>; // 创建文件夹
  renameFile: IpcRequestFun<'baiduyun-rename-file'>; // 重命名文件
  deleteFile: IpcRequestFun<'baiduyun-delete-file'>; // 删除文件
  getDownloadUrl: IpcRequestFun<'baiduyun-get-download-url'>; // 获取下载地址
}
