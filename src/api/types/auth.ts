import type { CommonResponse } from '@/types/request';

export namespace ApiRegister {
  /**
   * @description: 注册账号-请求参数
   */
  export interface Request {
    account: string; // 账号
    password: string; // 密码
    nickname: string; // 昵称
  }

  /**
   * @description: 注册账号-响应数据
   */
  export interface Response extends CommonResponse {}
}

export namespace ApiLogin {
  /**
   * @description: 用户信息
   */
  export interface User {
    account: string; // 账号
    nickname: string; // 昵称
    avatar: string; // 头像
    status: 'enable' | 'disable'; // 状态
    role: Role; // 角色信息
    storageOrigin: string; // 存储起点
  }

  /**
   * @description: 角色信息
   */
  export interface Role {
    name: string; // 名称
    describe: string; // 描述
  }

  /**
   * @description: 登录账号-请求参数
   */
  export interface Request {
    account: string; // 账号
    password: string; // 密码
  }

  /**
   * @description: 登录账号-响应数据
   */
  export interface Response extends CommonResponse<{ token: string; user: User }> {}
}

export namespace ApiLogout {
  /**
   * @description: 登出账号-响应数据
   */
  export interface Response extends CommonResponse {}
}
