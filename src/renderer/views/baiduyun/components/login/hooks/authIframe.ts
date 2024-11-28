import { webAuthLink } from '@/api/baiduyun';

/**
 * @description: 百度认证iframe逻辑-hook
 */
export function authIframe() {
  const iframe = document.createElement('iframe');

  /**
   * @description: 初始化
   */
  const init = () => {
    //   iframe.style.cssText = 'position: fixed; z-index: -999; opacity: 0;';
    iframe.style.cssText =
      'position: fixed; z-index: 999; top: 20px; left: 0px; width: 500px;height: 500px';
    iframe.setAttribute('src', `javascript:window.open("${webAuthLink()}", "_self")`);
    document.body.appendChild(iframe);
  };

  /**
   * @description: 账号登录
   * @param {string} account 账号
   * @param {string} password 密码
   */
  const accountLogin = (account: string, password: string) => {
    if (!iframe.contentDocument) return;
    const accountInput = iframe.contentDocument.querySelector(
      '#TANGRAM_3__userName'
    ) as HTMLInputElement;
    const passwordInput = iframe.contentDocument.querySelector(
      '#TANGRAM_3__password'
    ) as HTMLInputElement;
    const submitBtn = iframe.contentDocument.querySelector(
      '#TANGRAM_3__submit'
    ) as HTMLInputElement;

    let goToVerifyBtn: HTMLButtonElement;

    accountInput.value = account;
    passwordInput.value = password;
    submitBtn.click();

    return new Promise<void>((resolve) => {
      const loginTimer = setInterval(() => {
        goToVerifyBtn = iframe.contentDocument!.querySelector('#goToVerify') as HTMLButtonElement;
        if (goToVerifyBtn) {
          clearInterval(loginTimer);
          goToVerifyBtn.click();
          resolve();
        }
      }, 1000);
    });
  };

  init();
  onUnmounted(() => document.body.removeChild(iframe));

  return { accountLogin };
}
