import type { ApiLoginRequest } from '@/types/api/auth';
import type { FormRules } from 'element-plus';

/**
 * @description: 表单逻辑-hook
 */
export function useForm() {
  const formData = ref<ApiLoginRequest>({
    account: '',
    password: ''
  });

  const rules = reactive<FormRules<ApiLoginRequest>>({
    account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  });

  return { formData, rules };
}
