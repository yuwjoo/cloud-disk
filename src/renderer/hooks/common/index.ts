/**
 * @description: 带加载状态发送请求
 * @param {() => Promise<any>} request 请求函数
 * @param {boolean} immediate 是否立即请求
 */
export const useLoadingFetch = <T = any>(request: () => Promise<T>, immediate?: boolean) => {
  const loading = ref<boolean>(false);
  const fetch = async (): Promise<T> => {
    loading.value = true;
    try {
      return await request();
    } finally {
      loading.value = false;
    }
  };

  if (immediate) fetch();

  return [loading, fetch] as const;
};
