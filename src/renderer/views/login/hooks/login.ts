import { useUserStore } from '@/store/user';
import type { ApiLoginRequest } from '@/types/api/auth';
import type { FormInstance, FormRules } from 'element-plus';

/**
 * @description: 登录逻辑
 */
export function useLogin() {
  const userStore = useUserStore();
  const loading = ref<boolean>(false); // 加载中
  const formRef = ref<FormInstance>(); // 表单ref
  const formData = ref<ApiLoginRequest>({
    account: '',
    password: ''
  }); // 表单数据
  const formRules = reactive<FormRules<ApiLoginRequest>>({
    account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  }); // 表单规则

  /**
   * @description: 处理登录
   */
  async function handleLogin() {
    try {
      await formRef.value!.validate();
      loading.value = true;
      await userStore.login(formData.value);
    } finally {
      loading.value = false;
    }
  }

  return { loading, formRef, formData, formRules, handleLogin };
}
