export enum responseCode {
  success = 20200, // 请求成功
  error = 40400, // 请求错误
  reLogin = 40401, // 重新登录
  serverError = 50501 // 服务器错误
}

export interface ResponseBody<T = any> {
  code: responseCode; // 响应码
  data?: T; // 响应数据
  msg: string; // 响应消息
}

export {};
