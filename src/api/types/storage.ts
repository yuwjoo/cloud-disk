import type { CommonResponse, PageResponse } from '@/types/request';

/**
 * @description: 文件信息
 */
export interface FileInfo {
  path: string; // 路径
  parent: string; // 父级路径
  level: number; // 层级
  name: string; // 名称
  isDirectory: boolean; // 是否目录
  createdTime: number; // 创建时间戳
  updatedTime: number; // 更新时间戳
  readable: boolean; // 可读
  writable: boolean; // 可写
}

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
  export interface Response extends PageResponse<FileInfo> {}
}

export namespace ApiCreateFile {
  /**
   * @description: 创建文件/目录-请求参数
   */
  export interface Request {
    parent: string; // 父级路径
    name: string; // 名称
    isDirectory: boolean; // 是否目录
    ossFileId: string; // OSS文件ID
  }

  /**
   * @description: 创建文件/目录-响应数据
   */
  export interface Response extends CommonResponse<FileInfo> {}
}

export namespace ApiRenameFile {
  /**
   * @description: 重命名文件/目录-请求参数
   */
  export interface Request {
    parent: string; // 父级路径
    oldName: string; // 旧名称
    newName: string; // 新名称
  }

  /**
   * @description: 重命名文件/目录-响应数据
   */
  export interface Response extends CommonResponse<FileInfo> {}
}

export namespace ApiMoveFile {
  /**
   * @description: 移动文件/目录-请求参数
   */
  export interface Request {
    name: string; // 名称
    oldParent: string; // 旧父级路径
    newParent: string; // 新父级路径
  }

  /**
   * @description: 移动文件/目录-响应数据
   */
  export interface Response extends CommonResponse<FileInfo> {}
}

export namespace ApiDeleteFile {
  /**
   * @description: 删除文件/目录-请求参数
   */
  export interface Request {
    path: string; // 路径
  }

  /**
   * @description: 删除文件/目录-响应数据
   */
  export interface Response extends CommonResponse {}
}
