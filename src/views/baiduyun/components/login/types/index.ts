/**
 * @description: 当前登录面板
 */
export type ActivePanel = 'form' | 'qrcode';

/**
 * @description: 认证frame-账号登陆数据
 */
export type AccountLoginData = {
  account: string; // 账号
  password: string; // 密码
};

export type AccountLoginResponse = {
  code: 200 | 201 | 400; // 响应码 200: 成功，201: 需要继续验证， 400：异常
  message: string; // 响应消息
};
