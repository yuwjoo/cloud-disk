import { contextBridge } from 'electron';
import * as baiduyun from '@/ipc/baiduyun';
import type { ElectronApi } from 'common/types/electron-api';

export const electronApi: ElectronApi = {
  desktop: true,
  version: process.versions.electron,
  baiduyun
};

contextBridge.exposeInMainWorld('electronApi', electronApi);
