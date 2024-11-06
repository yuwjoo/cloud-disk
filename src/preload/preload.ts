import { contextBridge } from 'electron';
import { addListener, removeAllListener, removeListener } from './ipc/listener';
import { window } from '@/ipc/window';
import { baiduyun } from '@/ipc/baiduyun';
import type { ElectronApi } from 'common/types/electron-api';

const electronApi: ElectronApi = {
  desktop: true,
  version: process.versions.electron,
  addListener,
  removeListener,
  removeAllListener,
  window,
  baiduyun
};

contextBridge.exposeInMainWorld('electronApi', electronApi);
