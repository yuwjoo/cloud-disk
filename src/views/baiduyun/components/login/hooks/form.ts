import { useLoadingFetch } from '@/hooks/common';
import type { ApiLoginRequest } from '@/types/api/auth';
import type { FormInstance, FormRules, InputInstance } from 'element-plus';
import type { EmitFn, Ref } from 'vue';
import type { EmitsType } from '../Login.vue';
import type { ActivePanel } from '../types';
import { useAuthIframe } from './authIframe';

/**
 * @description: 表单逻辑-hook
 */
export function useForm(activePanel: Ref<ActivePanel>, emits: EmitFn<EmitsType>) {
  const { accountLogin, verifySMSCode } = useAuthIframe();

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
    const res = await accountLogin(formData.value);

    if (res.code === 200) {
      console.log('登录成功', res);
    } else if (res.code === 201) {
      ElMessageBox.prompt(res.message, '手机验证', {
        confirmButtonText: '下一步',
        cancelButtonText: '取消',
        beforeClose: async (action, ctx, close) => {
          if (action !== 'confirm') {
            close();
            return;
          }
          ctx.confirmButtonLoading = true;
          try {
            const res = await verifySMSCode(ctx.inputValue);
            console.log(res);
            close();
          } finally {
            ctx.confirmButtonLoading = false;
          }
        }
      }).catch(() => {});
    } else {
      ElMessage({
        type: 'error',
        message: res.message
      });
    }
    // emits('login', '');
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
