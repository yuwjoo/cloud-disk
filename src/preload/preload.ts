import { contextBridge } from 'electron';
import * as baiduyun from '@/api/baiduyun';
import type { ElectronApi } from 'common/types/electron-api';

export const electronApi: ElectronApi = {
  desktop: true, // 是否桌面端
  version: process.versions.electron, // electron版本
  baiduyun
};

contextBridge.exposeInMainWorld('electronApi', electronApi);
