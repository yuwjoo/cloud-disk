import type { ResponseBody } from '../utils/request';

// 登录请求参数
export type LoginReqParams = {
  account: string; // 账号
  password: string; // 密码
};

// 登录响应数据
export type LoginResData = ResponseBody<{
  token: string; // token
  user: {
    account: string; // 账号
    nickname: string; // 昵称
    avatar: string; // 头像
    status: string; // 状态
    role: {
      name: string; // 角色名称
      describe: string; // 角色详情
    };
    storageOrigin: string; // 存储起点
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

// 获取分片上传接口-响应body
export type GetMultipartResponseBody = ResponseBody<{
  partSize: number; // 分片大小
  startPartNumber: number; // 起始分片序号
  multipartUrls: { partNumber: number; url: string }[]; // 分片上传的url
  nextMultipartUrl?: string; // 继续分片上传的url
  submitMultipartUrl?: string; // 提交分片上传的url
}>;
