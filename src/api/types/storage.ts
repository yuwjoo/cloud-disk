import type { Entity } from '@/types/entity';
import type { CommonResponse, PageResponse } from '@/types/request';

export namespace ApiGetFileList {
  /**
   * @description: 获取文件列表-请求参数
   */
  export interface Request {
    parent: string; // 父级路径
  }

  /**
   * @description: 获取文件列表-响应数据
   */
  export interface Response
    extends PageResponse<{
      path: '/public'; // 路径
      parent: '/'; // 父级路径
      level: 2; // 层级
      name: 'public'; // 名称
      isDirectory: true; // 是否目录
      createdTime: 1726810130000; // 创建时间戳
      updatedTime: 1726810130000; // 更新时间戳
      readable: true; // 可读
      writable: true; // 可写
    }> {}
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
