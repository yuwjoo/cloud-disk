import type { CommonResponse } from '@/types/request';

export namespace ApiPreCheckFile {
  /**
   * @description: 预检查文件-请求参数
   */
  export interface Request {
    name: string; // 文件名
    hash: string; // 文件hash
    size: number; // 文件大小
    mimeType: string; // 文件类型
    multipart: boolean; // 是否分片上传
  }

  /**
   * @description: 预检查文件-响应数据
   */
  export interface Response
    extends CommonResponse<{
      mode: 'second' | 'simple' | 'multipart'; // 上传模式
      value: string; // 可能是（秒传：已上传文件id）（简单上传：上传url）（分片上传：上传id）
      expire: number; // 过期时间
    }> {}
}

export namespace ApiGetMultiparts {
  /**
   * @description: 获取分片集合-请求参数
   */
  export interface Request {
    name: string; // 文件名
    hash: string; // 文件hash
    uploadId: string; // 上传id
    partNumbers: number[]; // 分片序号集合
  }

  /**
   * @description: 获取分片集合-响应数据
   */
  export interface Response
    extends CommonResponse<
      {
        number: number; // 分片序号
        url: string; // 上传url
        expire: number; // 过期时间
      }[]
    > {}
}

export namespace ApiMergeMultipart {
  /**
   * @description: 合并上传的分片-请求参数
   */
  export interface Request {
    name: string; // 文件名
    hash: string; // 文件hash
    uploadId: string; // 上传id
    parts: {
      number: number; // 分片序号
      etag: number; // etag
    }[];
  }

  /**
   * @description: 合并上传的分片-响应数据
   */
  export interface Response extends CommonResponse {}
}
