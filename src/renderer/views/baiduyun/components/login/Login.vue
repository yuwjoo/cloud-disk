<!--
 * @FileName: 百度网盘-登录页
 * @FilePath: \cloud-disk\src\renderer\views\baiduyun\components\login\Login.vue
 * @Author: YH
 * @Date: 2024-11-13 17:10:37
 * @LastEditors: YH
 * @LastEditTime: 2024-11-26 15:48:16
 * @Description: 
-->
<template>
  <div class="login">
    <div class="login-panel">
      <div class="login-panel__title">登录您的百度云</div>
      <ElForm
        class="login-panel__form"
        ref="form"
        :model="formData"
        label-position="top"
        :rules="rules"
        hide-required-asterisk
        @submit.prevent
      >
        <ElFormItem prop="account" label="账号">
          <ElInput
            v-model="formData.account"
            placeholder="手机号/用户名/邮箱"
            @keyup.enter="passwordInputRef?.focus()"
          />
        </ElFormItem>
        <ElFormItem prop="password" label="密码">
          <ElInput
            ref="passwordInput"
            v-model="formData.password"
            type="password"
            show-password
            placeholder="密码"
            @keyup.enter="handleLogin"
          />
        </ElFormItem>
        <ElFormItem>
          <ElButton
            class="login-panel__login-btn"
            type="primary"
            :loading="loginLoading"
            @click="handleLogin"
          >
            登录
          </ElButton>
        </ElFormItem>
      </ElForm>
    </div>
  </div>
</template>

<script setup lang="ts" name="BaiduyunLogin">
import { useLoadingFetch } from '@/hooks/common';
import { useUserStore } from '@/store/user';
import { useForm } from './hooks/form';

export type EmitsType = {
  login: [token: string]; // 登录成功
};

const emits = defineEmits<EmitsType>();

const formRef = useTemplateRef('form');
const passwordInputRef = useTemplateRef('passwordInput');

const { formData, rules } = useForm();

const [loginLoading, handleLogin] = useLoadingFetch(async () => {
  await formRef.value!.validate();
  await useUserStore().login(formData.value);
  emits('login', '333333333333333');
});
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
