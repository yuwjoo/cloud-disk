import { contextBridge } from 'electron';
import { addListener, removeAllListener, removeListener } from './api/listener';
import { window as windowApi } from '@/api/window';
import { blog } from '@/api/blog';
import type { ElectronApi } from 'common/types/electronApi';

const electronApi: ElectronApi = {
  desktop: true,
  version: process.versions.electron,
  addListener,
  removeListener,
  removeAllListener,
  window: windowApi,
  blog
};

contextBridge.exposeInMainWorld('electronApi', electronApi);
