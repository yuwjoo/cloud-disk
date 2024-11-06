import { contextBridge } from 'electron';
import * as window from '@/ipc/window';
import * as baiduyun from '@/ipc/baiduyun';
import type { ElectronApi } from 'common/types/electron-api';
import { addListener, removeAllListener, removeListener } from './ipc/listener';

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
