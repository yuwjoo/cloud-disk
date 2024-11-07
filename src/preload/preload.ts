import { contextBridge } from 'electron';
import { addListener, removeAllListener, removeListener } from './api/listener';
import { window } from '@/api/window';
import { baiduyun } from '@/api/baiduyun';
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
