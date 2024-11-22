/**
 * @description: 带加载状态发送请求
 * @param {() => Promise<any>} request 请求函数
 * @param {boolean} immediate 是否立即请求（默认true）
 */
export const useLoadingFetch = (request: () => Promise<any>, immediate: boolean = true) => {
  const loading = ref<boolean>(false);
  const fetch = async () => {
    loading.value = true;
    try {
      await request();
    } finally {
      loading.value = false;
    }
  };

  if (immediate) fetch();

  return [loading, fetch] as const;
};
