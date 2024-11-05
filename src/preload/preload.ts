import { contextBridge } from 'electron';

export const electronApi = {
  desktop: true, // 是否桌面端
  version: process.versions.electron // electron版本
};

contextBridge.exposeInMainWorld('electronApi', electronApi);
