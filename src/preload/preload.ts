import { contextBridge } from 'electron';
import { addListener, removeAllListener, removeListener } from './api/listener';
import { window as windowApi } from '@/api/window';
import type { ElectronApi } from 'common/types/electronApi';
import { Titlebar } from 'custom-electron-titlebar';

const electronApi: ElectronApi = {
  desktop: true,
  version: process.versions.electron,
  addListener,
  removeListener,
  removeAllListener,
  window: windowApi
};

contextBridge.exposeInMainWorld('electronApi', electronApi);

window.addEventListener('DOMContentLoaded', () => {
  new Titlebar({}); // 标题栏的具体实现逻辑应在此处扩展
});
