import type { ElectronApi } from 'common/types/electronApi';

export {};

declare global {
  interface Window {
    electronApi?: ElectronApi;
  }
}
