import { ResponseBody } from 'types/src/request/index';

// 登录请求参数
export type LoginReqParams = {
  account: string; // 账号
  password: string; // 密码
  temporary: boolean; // 是否临时登录
};

// 登录响应数据
export type LoginResData = ResponseBody<{
  token: string; // token
  user: {
    nickname: string; // 昵称
    account: string; // 账号
    roleId: string; // 角色id
    role: string; // 角色名
    avatar: string | null; // 头像
  };
}>;

// sts请求参数
export type StsReqParams = void;

// sts响应数据
export type StsResData = ResponseBody<{
  AccessKeyId: string; // AccessKeyId
  AccessKeySecret: string; // AccessKeySecret
  SecurityToken: string; // SecurityToken
  Expiration: string; // 过期时间
  uploadPath: string; // 上传路径
}>;

export {};
