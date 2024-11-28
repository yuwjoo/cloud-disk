import { useLoadingFetch } from '@/hooks/common';
import type { EmitFn, Ref } from 'vue';
import type { EmitsType } from '../Login.vue';
import { deviceCodeAuth, deviceCodeToToken } from '@/api/baiduyun';
import type { ApiDeviceCodeAuthResponse } from '@/types/api/baiduyun';
import type { ActivePanel } from '../types';

/**
 * @description: 二维码逻辑-hook
 */
export function useQrcode(activePanel: Ref<ActivePanel>, emits: EmitFn<EmitsType>) {
  const data = ref<ApiDeviceCodeAuthResponse>(); // 认证数据
  const qrcodeUrl = computed<string>(() => data.value?.qrcode_url || ''); // 二维码图片地址
  const isExpire = ref<boolean>(false); // 二维码是否过期

  let fetchTime: number = 0; // 接口请求时间戳
  let pollingTimer: NodeJS.Timeout; // 轮询定时器

  const [qrcodeLoading, fetchQrcode] = useLoadingFetch(async () => {
    data.value = await deviceCodeAuth();
    fetchTime = Date.now();
  });

  /**
   * @description: 初始化
   */
  const init = async () => {
    if (unref(activePanel) === 'qrcode') {
      isExpire.value = false;
      await fetchQrcode();
      pollingTimer = setInterval(pollingHandler, data.value!.interval * 1000);
    } else {
      clearInterval(pollingTimer);
    }
  };

  /**
   * @description: 轮询处理函数
   */
  const pollingHandler = async () => {
    isExpire.value = data.value!.expires_in * 1000 + fetchTime <= Date.now();
    if (unref(isExpire)) {
      clearInterval(pollingTimer);
      return;
    }

    try {
      const res = await deviceCodeToToken({ deviceCode: data.value!.device_code });

      ElMessage({
        type: 'success',
        message: '登录成功'
      });
      clearInterval(pollingTimer);
      emits('login', res.access_token);
    } catch {
      /* empty */
    }
  };

  watch(activePanel, init, { immediate: true });

  onUnmounted(() => {
    clearInterval(pollingTimer);
  });

  return { qrcodeUrl, qrcodeLoading, isExpire, init };
}
