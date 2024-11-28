import { useLoadingFetch } from '@/hooks/common';
import { useUserStore } from '@/store/user';
import type { ApiLoginRequest } from '@/types/api/auth';
import type { FormInstance, FormRules, InputInstance } from 'element-plus';
import type { EmitFn, Ref } from 'vue';
import type { EmitsType } from '../Login.vue';
import type { ActivePanel } from '../types';

/**
 * @description: 表单逻辑-hook
 */
export function useForm(activePanel: Ref<ActivePanel>, emits: EmitFn<EmitsType>) {
  const formRef = ref<FormInstance>();
  const passwordInputRef = ref<InputInstance>();

  const formData = ref<ApiLoginRequest>({
    account: '',
    password: ''
  });

  const rules = reactive<FormRules<ApiLoginRequest>>({
    account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  });

  const [loginLoading, handleLogin] = useLoadingFetch(async () => {
    await formRef.value!.validate();
    await useUserStore().login(formData.value);
    emits('login', '');
  });

  /**
   * @description: 初始化
   */
  const init = () => {
    if (unref(activePanel) === 'form') {
      formData.value = {
        account: '',
        password: ''
      };
    }
  };

  watch(activePanel, init, { immediate: true });

  return { formRef, passwordInputRef, formData, rules, loginLoading, handleLogin };
}
