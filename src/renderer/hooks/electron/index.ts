import type { ElectronApi } from 'common/types/electronApi';

const electronApi = window.electronApi || window.top?.electronApi;

export const isDesktop = electronApi?.desktop ?? false; // 是否桌面端

/**
 * @description: 使用electron api
 */
export const useElectronApi = (): ElectronApi => {
  if (!electronApi) throw 'not electron env';
  return electronApi;
};

/**
 * @description: 添加electron事件监听
 */
export const useAddListener: ElectronApi['addListener'] = (name, callback, options) => {
  const electronApi = useElectronApi();
  electronApi.addListener(name, callback, options);
  onUnmounted(() => {
    electronApi.removeListener(name, callback);
  });
};
