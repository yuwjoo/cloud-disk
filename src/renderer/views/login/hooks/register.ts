import { register } from '@/api/auth';
import type { FormInstance, FormRules } from 'element-plus';
import type { RegisterFormData } from '../types/register-panel';

/**
 * @description: 注册逻辑
 */
export function useRegister() {
  const loading = ref<boolean>(false); // 加载中
  const formRef = ref<FormInstance>(); // 表单ref
  const formData = ref<RegisterFormData>({
    nickname: '',
    account: '',
    password: '',
    confirmPassword: ''
  }); // 表单数据
  const formRules = reactive<FormRules<RegisterFormData>>({
    nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
    account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    confirmPassword: [
      { required: true, message: '请二次确认密码', trigger: 'blur' },
      {
        validator: (_rule, value) => value === formData.value.password,
        message: '两次密码不一致',
        trigger: 'blur'
      }
    ]
  }); // 表单规则

  /**
   * @description: 处理注册
   */
  async function handleRegister() {
    try {
      await formRef.value!.validate();
      loading.value = true;
      await register(formData.value);
    } finally {
      loading.value = false;
    }
  }

  return { loading, formRef, formData, formRules, handleRegister };
}
