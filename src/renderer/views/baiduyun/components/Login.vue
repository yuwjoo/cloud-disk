<!--
 * @FileName: 百度网盘-登录页
 * @FilePath: \cloud-disk\src\renderer\views\baiduyun\components\Login.vue
 * @Author: YH
 * @Date: 2024-11-13 17:10:37
 * @LastEditors: YH
 * @LastEditTime: 2024-11-13 17:22:04
 * @Description: 
-->
<template>
  <div class="login">
    <div class="login-panel">
      <div class="login-panel__title">登录您的百度云</div>
      <el-form
        class="login-panel__form"
        ref="formRef"
        :model="formData"
        label-position="top"
        :rules="rules"
        hide-required-asterisk
        @submit.prevent
      >
        <el-form-item prop="account" label="账号">
          <el-input
            v-model="formData.account"
            placeholder="手机号/用户名/邮箱"
            @keyup.enter="passwordInputRef?.focus()"
          />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            ref="passwordInputRef"
            v-model="formData.password"
            type="password"
            show-password
            placeholder="密码"
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-panel__login-btn"
            type="primary"
            :loading="loginLoading"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts" name="BaiduyunLogin">
import { useUserStore } from '@/store/user';
import type { ApiLoginRequest } from '@/types/api/common/auth';
import type { FormInstance, FormRules, InputInstance } from 'element-plus';

const userStore = useUserStore();

const loginLoading = ref<boolean>(false);

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

/**
 * @description: 处理登录
 */
const handleLogin = async () => {
  try {
    await formRef.value!.validate();
    loginLoading.value = true;
    await userStore.login(formData.value);
  } catch {
    /* empty */
  }
  loginLoading.value = false;
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .login-panel {
    width: 400px;

    .login-panel__title {
      text-align: center;
      font-weight: bold;
      color: var(--text-color-primary);
      font-size: var(--text-size-extra-large);
      margin-bottom: var(--spacing-extra-large);
    }

    .login-panel__form {
      .login-panel__login-btn {
        width: 100%;
        margin-top: var(--spacing-small);
      }
    }
  }
}
</style>
