import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electronApi', {
  desktop: true, // 是否桌面端
  version: process.versions.electron // electron版本
});
