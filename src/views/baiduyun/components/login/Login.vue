<!--
 * @FileName: 百度网盘-登录页
 * @FilePath: \cloud-disk\src\renderer\views\baiduyun\components\login\Login.vue
 * @Author: YH
 * @Date: 2024-11-13 17:10:37
 * @LastEditors: YH
 * @LastEditTime: 2024-11-28 20:52:57
 * @Description: 
-->
<template>
  <div class="login">
    <div class="login-panel">
      <div class="login-panel__title">登录您的百度云</div>
      <ElForm
        v-if="activePanel === 'form'"
        class="login-panel__form"
        ref="formRef"
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
            ref="passwordInputRef"
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

      <div v-else class="login-panel__qrcode">
        <ElImage v-loading="qrcodeLoading" class="login-panel__qrcode-img" :src="qrcodeUrl" @mousedown.prevent />
        <div v-if="isExpire" class="login-panel__qrcode-mask">
          二维码已过期
          <ElButton
            class="login-panel__qrcode-mask-reset"
            type="primary"
            size="small"
            @click="initQrcode"
          >
            重新生成
          </ElButton>
        </div>
      </div>

      <div class="login-panel__footer">
        <ElLink v-if="activePanel === 'form'" type="primary" @click="activePanel = 'qrcode'">
          切换扫码登录
        </ElLink>
        <ElLink v-else type="primary" @click="activePanel = 'form'">切换普通登录</ElLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="BaiduyunLogin">
import { useForm } from './hooks/form';
import { useQrcode } from './hooks/qrcode';
import type { ActivePanel } from './types';

export type EmitsType = {
  login: [token: string]; // 登录成功
};

const emits = defineEmits<EmitsType>();

const activePanel = ref<ActivePanel>('form'); // 当前登录面板

const { formRef, passwordInputRef, formData, rules, loginLoading, handleLogin } = useForm(
  activePanel,
  emits
);

const { qrcodeUrl, qrcodeLoading, isExpire, init: initQrcode } = useQrcode(activePanel, emits);
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

    .login-panel__qrcode {
      position: relative;
      text-align: center;

      .login-panel__qrcode-img {
        display: inline-block;
        width: 320px;
        height: 320px;
      }

      .login-panel__qrcode-mask {
        position: absolute;
        width: 320px;
        height: 320px;
        top: 0px;
        left: 0px;
        right: 0px;
        margin: auto;
        background-color: var(--overlay-color-light);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: var(--color-white);

        .login-panel__qrcode-mask-reset {
          margin-top: var(--spacing-small);
        }
      }
    }

    .login-panel__footer {
      text-align: right;
    }
  }
}
</style>
