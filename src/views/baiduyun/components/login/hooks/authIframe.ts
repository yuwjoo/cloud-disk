import { webAuthLink } from '@/api/baiduyun';
import type { AccountLoginData, AccountLoginResponse } from '../types';

/**
 * @description: 百度认证iframe逻辑-hook
 */
export function useAuthIframe() {
  const iframe = document.createElement('iframe');

  /**
   * @description: 初始化
   */
  const init = () => {
    //   iframe.style.cssText = 'position: fixed; z-index: -999; opacity: 0;';
    iframe.style.cssText =
      'position: fixed; z-index: 999; top: 20px; left: 0px; width: 500px;height: 500px; background-color: white;';
    iframe.setAttribute('src', `javascript:window.open("${webAuthLink()}", "_self")`);
    document.body.appendChild(iframe);
  };

  /**
   * @description: 查找元素
   * @param {string} selector 查询条件
   * @param {number} timeout 查询超时时间
   * @return {Promise<T>} 获取到的元素
   */
  const querySelector = <T extends Element>(
    selector: string,
    timeout: number = 5000
  ): Promise<T> => {
    if (!iframe.contentDocument) return Promise.reject();

    const findElement = (): T | null => iframe.contentDocument!.querySelector(selector);
    const element = findElement();

    if (element) return Promise.resolve(element);

    return new Promise((resolve, reject) => {
      const startTime = Date.now();

      const timer = setInterval(() => {
        const element = findElement();

        if (element) {
          clearInterval(timer);
          resolve(element);
        } else if (Date.now() - startTime >= timeout) {
          clearInterval(timer);
          reject();
        }
      }, 500);
    });
  };

  /**
   * @description: 执行睡眠
   * @param {number} time 睡眠时长
   * @return {Promise<void>} promise
   */
  const sleep = (time: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  };

  /**
   * @description: 账号登录
   * @param {AccountLoginData} data 登录数据
   * @return {Promise<AccountLoginResponse>} 响应
   */
  const accountLogin = async (data: AccountLoginData): Promise<AccountLoginResponse> => {
    try {
      // 尝试登录
      const accountInput = await querySelector<HTMLInputElement>('#TANGRAM_3__userName');
      const passwordInput = await querySelector<HTMLInputElement>('#TANGRAM_3__password');
      const submitBtn = await querySelector<HTMLInputElement>('#TANGRAM_3__submit');

      accountInput.value = data.account;
      passwordInput.value = data.password;
      submitBtn.click();

      // 等待登录加载完成
      await querySelector<HTMLInputElement>('#TANGRAM_3__submit[value="登录"]');

      // 获取登录提示
      const loginTips = (await querySelector<HTMLSpanElement>('#TANGRAM_3__error'))?.innerText;

      if (loginTips.includes('用户名或密码有误，请重新输入')) {
        return {
          code: 400,
          message: '用户名或密码有误，请重新输入'
        };
      } else if (loginTips.includes('登录失败,请在弹出的窗口操作,或重新登录')) {
        // 寻找验证按钮并点击
        const goToVerifyBtn = await querySelector<HTMLButtonElement>('#goToVerify');
        await sleep(1000);
        goToVerifyBtn.click();

        // 获取校验页面信息
        const verifyTips = await querySelector<HTMLDivElement>('.pass-auth-verify-subtitle');

        return {
          code: 201,
          message: verifyTips.innerText
        };
      } else {
        return {
          code: 400,
          message: '未知错误, 请更换登录方式！'
        };
      }
    } catch {
      return {
        code: 400,
        message: '无法登录, 请稍后重试！'
      };
    }
  };

  /**
   * @description: 校验短信验证码
   * @param {string} code 验证码
   * @return {Promise<AccountLoginResponse>} 响应
   */
  const verifySMSCode = async (code: string): Promise<AccountLoginResponse> => {
    try {
      const verifyInput = await querySelector<HTMLInputElement>('#passAuthVcode');
      const nextBtn = await querySelector<HTMLDivElement>('#passAuthSubmitCode');

      verifyInput.value = code;
      nextBtn.click();

      await sleep(1000);

      const data: Record<string, any> = {};
      iframe
        .contentWindow!.location.hash.slice(1)
        .split('&')
        .forEach((item) => {
          const [key, value] = item.split('=');
          data[key] = value;
        });

      console.log(data);

      return {
        code: 200,
        message: data.access_token
      };
    } catch {
      return {
        code: 400,
        message: '无法登录, 请稍后重试！'
      };
    }
  };

  init();
  onUnmounted(() => document.body.removeChild(iframe));

  return { accountLogin, verifySMSCode };
}
