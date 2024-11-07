import type { ElectronApi } from 'common/types/electron-api';

export {};

declare global {
  interface Window {
    electronApi?: ElectronApi;
  }
}
