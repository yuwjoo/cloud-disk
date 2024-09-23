import type { Entity } from '@/types/entity';
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
   * @description: 登录账号-请求参数
   */
  export interface Request {
    account: string; // 账号
    password: string; // 密码
  }

  /**
   * @description: 登录账号-响应数据
   */
  export interface Response extends CommonResponse<{ token: string; user: Entity.User }> {}
}

export namespace ApiLogout {
  /**
   * @description: 登出账号-响应数据
   */
  export interface Response extends CommonResponse {}
}
