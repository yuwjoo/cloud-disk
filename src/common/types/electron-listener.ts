import { WINDOW_CHANGE_FULL_SCREEN, WINDOW_CHANGE_MAXIMIZE } from 'common/ipc-constants';
import type { IpcRendererEvent } from 'electron';

/**
 * @description: 事件集合
 */
export interface EventMap {
  [WINDOW_CHANGE_MAXIMIZE]: [isMaximize: boolean];
  [WINDOW_CHANGE_FULL_SCREEN]: [isFullScreen: boolean];
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
  <K extends keyof EventMap>(
    name: K,
    callback: (event: IpcRendererEvent, ...args: EventMap[K]) => void,
    options?: ListenerOptions
  ): void;
}

/**
 * @description: 移除事件函数
 */
export interface RemoveListener {
  <K extends keyof EventMap>(
    name: K,
    callback: (event: IpcRendererEvent, ...args: EventMap[K]) => void
  ): void;
}

/**
 * @description: 移除所有事件函数
 */
export interface RemoveAllListener {
  <K extends keyof EventMap>(name: K): void;
}
