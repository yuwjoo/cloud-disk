<!--
 * @FileName: 登录页
 * @FilePath: \cloud-disk\src\renderer\views\login\Login.vue
 * @Author: YH
 * @Date: 2024-04-30 17:29:06
 * @LastEditors: YH
 * @LastEditTime: 2024-12-26 17:32:50
 * @Description: 
-->
<template>
  <div class="login">
    <input id="login-checkbox" type="checkbox" />

    <div class="login-card">
      <div class="login-card__inner">
        <!-- 卡片正面-登录 start -->
        <div class="login-card__front">
          <div class="login-card__content login-form">
            <div class="login-form__title">登录账号</div>
            <ElForm
              class="login-form__form"
              ref="loginFormRef"
              :model="loginFormData"
              :rules="loginFormRules"
            >
              <ElFormItem prop="account">
                <ElInput
                  v-model="loginFormData.account"
                  placeholder="请输入账号"
                  :prefix-icon="IEUser"
                />
              </ElFormItem>
              <ElFormItem prop="password">
                <ElInput
                  v-model="loginFormData.password"
                  type="password"
                  placeholder="请输入密码"
                  :prefix-icon="IELock"
                  show-password
                />
              </ElFormItem>
            </ElForm>
            <ElButton
              class="login-form__submit"
              type="primary"
              :loading="loginLoading"
              @click="handleLogin"
            >
              登录
            </ElButton>
            <div class="login-form__footer">
              <label class="login-form__footer-link" for="login-checkbox">
                <ElLink>注册新账号</ElLink>
              </label>
              <ElLink class="login-form__footer-link">忘记密码?</ElLink>
            </div>
          </div>
        </div>
        <!-- 卡片正面-登录 end -->

        <!-- 卡片背面-注册 start -->
        <div class="login-card__back">
          <div class="login-card__content login-form">
            <div class="login-form__title">注册账号</div>
            <ElForm
              class="login-form__form"
              ref="registerFormRef"
              :model="registerFormData"
              :rules="registerFormRules"
            >
              <ElFormItem prop="nickname">
                <ElInput
                  v-model="registerFormData.nickname"
                  placeholder="请输入昵称"
                  :prefix-icon="IEUser"
                />
              </ElFormItem>
              <ElFormItem prop="account">
                <ElInput
                  v-model="registerFormData.account"
                  placeholder="请输入账号"
                  :prefix-icon="IEUser"
                />
              </ElFormItem>
              <ElFormItem prop="password">
                <ElInput
                  v-model="registerFormData.password"
                  type="password"
                  placeholder="请输入密码"
                  :prefix-icon="IELock"
                  show-password
                />
              </ElFormItem>
              <ElFormItem prop="confirmPassword">
                <ElInput
                  v-model="registerFormData.confirmPassword"
                  type="password"
                  placeholder="请再次确认密码"
                  :prefix-icon="IELock"
                  show-password
                />
              </ElFormItem>
            </ElForm>
            <ElButton
              class="login-form__submit"
              type="primary"
              :loading="registerLoading"
              @click="handleRegister"
            >
              注册
            </ElButton>
            <div class="login-form__footer">
              <div></div>
              <label class="login-form__footer-link" for="login-checkbox">
                <ElLink>前往登录</ElLink>
              </label>
            </div>
          </div>
        </div>
        <!-- 卡片背面-注册 end -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="LoginView">
import IEUser from '~icons/ep/user';
import IELock from '~icons/ep/lock';
import { useLogin } from './hooks/login';
import { useRegister } from './hooks/register';

const {
  loading: loginLoading,
  formRef: loginFormRef,
  formData: loginFormData,
  formRules: loginFormRules,
  handleLogin
} = useLogin();
const {
  loading: registerLoading,
  formRef: registerFormRef,
  formData: registerFormData,
  formRules: registerFormRules,
  handleRegister
} = useRegister();
</script>

<style lang="scss" scoped>
.login {
  background-color: #1f2029;
  height: 100vh;
  color: #c4c3ca;

  #login-checkbox {
    display: none;

    &:checked ~ .login-card .login-card__inner {
      transform: rotateY(180deg);
    }
  }

  .login-card {
    position: fixed;
    top: 50%;
    left: 0;
    right: 0;
    margin: auto;
    transform: translateY(-50%);
    width: 440px;
    max-width: 100%;
    height: 400px;
    perspective: 800px;

    .login-card__inner {
      position: relative;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      transition: all 600ms ease-out;
    }

    .login-card__front,
    .login-card__back {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: #2a2b38;
      background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg');
      background-position: bottom center;
      background-repeat: no-repeat;
      background-size: 300%;
      border-radius: 6px;
      transform-style: preserve-3d;
      backface-visibility: hidden;
    }

    .login-card__back {
      transform: rotateY(180deg);
    }

    .login-card__content {
      width: 100%;
      height: 100%;
      transform: translate3d(0, 0, 35px);
    }
  }

  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 35px;
    box-sizing: border-box;

    .login-form__title {
      margin-bottom: 40px;
      font-size: 24px;
      font-weight: bold;
      text-align: center;
    }

    .login-form__form {
      .el-input {
        :deep(.el-input__prefix) {
          color: var(--color-warning);
          font-size: 24px;
        }

        :deep(.el-input__wrapper) {
          padding: 0 20px;
          height: 48px;
          box-sizing: border-box;
          background-color: #1f2029;
          transition: all 200ms linear;
          box-shadow: 0 4px 8px 0 rgba(21, 21, 21, 0.2);

          .el-input__inner {
            color: #c4c3ca;

            &::placeholder {
              opacity: 0.7;
              transition: all 200ms linear;
            }

            &:focus::placeholder {
              opacity: 0;
            }
          }
        }
      }
    }

    .login-form__submit {
      height: 48px;
      font-size: 16px;
    }

    .login-form__footer {
      margin-top: 18px;
      display: flex;
      justify-content: space-between;

      .login-form__footer-link {
        cursor: pointer;
      }
    }
  }
}
</style>
