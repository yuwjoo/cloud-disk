import type { ElectronApi } from 'common/types/electron-api';

export const isDesktop = window.electronApi?.desktop ?? false; // 是否桌面端

/**
 * @description: electron api hook
 */
export const useElectronApi = (): ElectronApi => {
  if (!window.electronApi) throw 'not electron env';
  return window.electronApi;
};

/**
 * @description: 监听事件 hook
 */
export const useAddListener: ElectronApi['addListener'] = (name, callback, options) => {
  const electronApi = useElectronApi();
  electronApi.addListener(name, callback, options);
  onUnmounted(() => {
    electronApi.removeListener(name, callback);
  });
};
