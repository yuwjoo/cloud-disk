/**
 * @description: 认证token-hook
 */
export function useAccessToken() {
  const accessToken = ref<string>(localStorage.getItem('baiduyun_access_token') || ''); // 认证token

  /**
   * @description: 设置认证token
   * @param {string} token 认证token
   */
  const setAccessToken = (token: string) => {
    accessToken.value = token;
    localStorage.setItem('baiduyun_access_token', token);
  };

  return { accessToken: readonly(accessToken), setAccessToken };
}
