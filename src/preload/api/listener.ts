import { AddListener, RemoveListener, RemoveAllListener } from 'common/types/electronApi';
import { ipcRenderer } from 'electron';

/**
 * @description: 监听事件
 */
export const addListener: AddListener = (name, callback, options) => {
  if (options?.once) {
    ipcRenderer.once(name, callback);
  } else {
    ipcRenderer.on(name, callback);
  }
};

/**
 * @description: 移除事件
 */
export const removeListener: RemoveListener = (name, callback) => {
  ipcRenderer.off(name, callback);
};

/**
 * @description: 移除所有事件
 */
export const removeAllListener: RemoveAllListener = (name) => {
  ipcRenderer.removeAllListeners(name);
};
