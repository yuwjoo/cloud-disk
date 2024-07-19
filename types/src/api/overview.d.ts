import type { ResponseBody } from '../utils/request';

// 创建文件接口-请求query
export type CreateFileRequestQuery = {
  folderPath?: string; // 文件夹路径
  filename: string; // 文件名称
  resourceFlag: string; // 资源标识
};

// 创建文件接口-响应body
export type CreateFileResponseBody = ResponseBody<{
  folderPath: string; // 文件夹路径
  file: {
    fullPath: string; // 完整路径
    name: DirectorysTable['name']; // 名称
    size: DirectorysTable['size']; // 大小
    type: DirectorysTable['type']; // 类型
    cover: DirectorysTable['cover']; // 封面
    createTime: number; // 创建日期时间戳
    modifiedTime: number; // 修改日期时间戳
  };
}>;

// 创建文件夹接口-请求query
export type CreateFolderRequestQuery = {
  folderPath?: Required<DirectorysTable['path']>; // 文件夹路径
  name: DirectorysTable['name']; // 名称
};

// 创建文件夹接口-响应body
export type CreateFolderResponseBody = ResponseBody<{
  folderPath: string; // 文件夹路径
  folder: {
    fullPath: string; // 完整路径
    name: DirectorysTable['name']; // 名称
    size: DirectorysTable['size']; // 大小
    type: DirectorysTable['type']; // 类型
    cover: DirectorysTable['cover']; // 封面
    createTime: number; // 创建日期时间戳
    modifiedTime: number; // 修改日期时间戳
  };
}>;

// 下载文件接口-请求query
export type DownloadFileRequestQuery = {
  filePath: DirectorysTable['path']; // 文件路径
};

// 下载文件接口-响应body
export type DownloadFileResponseBody = ResponseBody<string>;

// 获取目录列表接口-请求query
export type GetDirectoryListRequestQuery = {
  folderPath?: string; // 文件夹路径
};

// 获取目录列表接口-响应body
export type GetDirectoryListResponseBody = ResponseBody<{
  folderPath: string; // 文件夹路径
  list: {
    fullPath: string; // 完整路径
    name: DirectorysTable['name']; // 名称
    size: DirectorysTable['size']; // 大小
    type: DirectorysTable['type']; // 类型
    cover: DirectorysTable['cover']; // 封面
    createTime: number; // 创建日期时间戳
    modifiedTime: number; // 修改日期时间戳
  }[];
}>;

// 获取资源标识接口-请求query
export type GetResourceFlagRequestQuery = {
  fileHash: string; // 文件hash
  fileSize: number; // 文件大小
};

// 获取资源标识接口-响应body
export type GetResourceFlagResponseBody = ResponseBody<string>; // 资源标识

// 删除文件接口-请求query
export type RemoveFileRequestQuery = {
  filePath: DirectorysTable['path']; // 文件路径
};

// 删除文件接口-响应body
export type RemoveFileResponseBody = ResponseBody<void>;

// oss上传回调接口-响应body
export type UploadCallbackResponseBody = ResponseBody<{
  resourceFlag: string; // 资源标识
}>;
