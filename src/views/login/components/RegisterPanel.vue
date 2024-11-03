<!--
 * @FileName: 登录页-注册面板
 * @FilePath: \cloud-disk\src\views\login\components\RegisterPanel.vue
 * @Author: YH
 * @Date: 2024-10-30 14:02:08
 * @LastEditors: YH
 * @LastEditTime: 2024-11-02 15:38:04
 * @Description: 
-->
<template>
  <div class="register-panel">
    <div class="register-panel__title">注册您的账号</div>
    <el-form
      class="register-panel__form"
      ref="formRef"
      :model="formData"
      label-position="top"
      :rules="rules"
      hide-required-asterisk
      @submit.prevent
    >
      <el-form-item prop="nickname" label="昵称">
        <el-input v-model="formData.nickname" />
      </el-form-item>
      <el-form-item prop="account" label="账号">
        <el-input v-model="formData.account" />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-popover
          placement="right"
          :width="260"
          :visible="passwordInputFocus && !!formData.password"
        >
          <template #default>
            <div class="password-strength__text" :class="`strength--${passwordStrength}`">
              强度：{{ passwordStrengthText }}
            </div>
            <div class="password-strength__bar" :class="`strength--${passwordStrength}`"></div>
            <div class="password-strength__tips">请至少输入6个字符; 请不要使用容易被猜到的密码</div>
          </template>
          <template #reference>
            <el-input
              v-model="formData.password"
              type="password"
              :maxlength="20"
              show-password
              @focus="passwordInputFocus = true"
              @blur="passwordInputFocus = false"
            />
          </template>
        </el-popover>
      </el-form-item>
      <el-form-item prop="confirmPassword" label="确认密码">
        <el-input
          v-model="formData.confirmPassword"
          type="password"
          :maxlength="20"
          show-password
        />
      </el-form-item>
      <el-form-item>
        <el-button
          class="register-panel__login-btn"
          type="primary"
          :loading="registerLoading"
          @click="handleRegister"
        >
          注册
        </el-button>
      </el-form-item>
    </el-form>
    <div class="register-panel__register">
      已经有账号了？<el-link type="primary" @click="emit('toggle')">前往登录</el-link>
    </div>
  </div>
</template>

<script setup lang="ts" name="RegisterPanel">
import { register } from '@/api/common/auth';
import type { FormInstance, FormRules } from 'element-plus';
import type { RegisterFormData } from '../types/register-panel';

const emit = defineEmits<{
  toggle: [];
}>();

const registerLoading = ref<boolean>(false);

const passwordInputFocus = ref<boolean>(false); // 密码输入框是否聚焦

const formRef = ref<FormInstance>();

const formData = ref<RegisterFormData>({
  nickname: '',
  account: '',
  password: '',
  confirmPassword: ''
});

const rules = reactive<FormRules<RegisterFormData>>({
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
});

const passwordStrength = computed(() => {
  let strength = 0;
  if (formData.value.password.length >= 8) {
    strength++;
  }
  if (/[a-z]/.test(formData.value.password)) {
    strength++;
  }
  if (/[A-Z]/.test(formData.value.password)) {
    strength++;
  }
  if (/\d/.test(formData.value.password)) {
    strength++;
  }
  if (/[!@#$%^&*()]/.test(formData.value.password)) {
    strength++;
  }
  return strength;
}); // 密码强度

const passwordStrengthText = computed(() => {
  return ['较弱', '弱', '中等', '较强', '强'][passwordStrength.value - 1];
}); // 密码强度文本

/**
 * @description: 处理注册
 */
const handleRegister = async () => {
  try {
    await formRef.value!.validate();
    registerLoading.value = true;
    await register(formData.value);
    emit('toggle');
  } catch {
    /* empty */
  }
  registerLoading.value = false;
};
</script>

<style lang="scss" scoped>
.register-panel {
  width: 400px;
  text-align: center;

  .register-panel__title {
    font-weight: bold;
    color: var(--text-color-primary);
    font-size: var(--text-size-extra-large);
    margin-bottom: var(--spacing-extra-large);
  }

  .register-panel__form {
    .register-panel__login-btn {
      width: 100%;
      margin-top: var(--spacing-small);
    }
  }

  .register-panel__register {
    margin-top: var(--spacing-extra-large);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.password-strength__text {
  font-size: var(--text-size-medium);
}

.password-strength__bar {
  margin-top: var(--spacing-small);
  border-radius: 6px;
  height: 6px;
  width: 100%;
  background-color: currentColor;
}

.password-strength__text,
.password-strength__bar {
  &.strength--1 {
    color: var(--color-error);
  }

  &.strength--2 {
    color: var(--color-danger);
  }

  &.strength--3 {
    color: var(--color-warning);
  }

  &.strength--4 {
    color: var(--color-primary);
  }

  &.strength--5 {
    color: var(--color-success);
  }
}

.password-strength__tips {
  margin-top: var(--spacing-medium);
  color: var(--text-color-secondary);
}
</style>
