import type { ResponseBody } from '../utils/request';

// 获取目录列表接口-请求query
export type GetDirectoryListRequestQuery = {
  parentFolderId?: DirectorysTable['id']; // 父级文件夹id
};

// 获取目录列表接口-响应body
export type GetDirectoryListResponseBody = ResponseBody<{
  folderPathList: {
    folderId: DirectorysTable['id']; // 文件夹id
    folderName: DirectorysTable['name']; // 文件夹名称
  }[];
  directoryList: {
    id: DirectorysTable['id']; // id
    name: DirectorysTable['name']; // 名称
    size: DirectorysTable['size']; // 大小
    type: DirectorysTable['type']; // 类型
    mimeType: DirectorysTable['mime_type']; // mime类型
    parentFolderId: DirectorysTable['id']; // 父级文件夹id
    createTime: number; // 创建日期时间戳
    modifiedTime: number; // 修改日期时间戳
  }[];
}>;

// 创建文件接口-请求query
export type CreateFileRequestQuery = {
  parentFolderId?: DirectorysTable['id']; // 父级文件夹id
  filename: DirectorysTable['name']; // 文件名称
  resourceFlag: string; // 资源标识
};

// 创建文件接口-响应body
export type CreateFileResponseBody = ResponseBody<{
  id: DirectorysTable['id']; // id
  name: DirectorysTable['name']; // 名称
  size: DirectorysTable['size']; // 大小
  type: DirectorysTable['type']; // 类型
  mimeType: DirectorysTable['mime_type']; // mime类型
  parentFolderId: DirectorysTable['id']; // 父级文件夹id
  createTime: number; // 创建日期时间戳
  modifiedTime: number; // 修改日期时间戳
}>;

// 获取资源标识接口-请求query
export type GetResourceFlagRequestQuery = {
  fileHash: string; // 文件hash
  fileSize: number; // 文件大小
};

// 获取资源标识接口-响应body
export type GetResourceFlagResponseBody = ResponseBody<string>; // 资源标识

// 下载文件接口-请求query
export type DownloadFileRequestQuery = {
  fileId?: DirectorysTable['id']; // 文件id
};

// 下载文件接口-响应body
export type DownloadFileResponseBody = ResponseBody<string>;

// 创建文件夹接口-请求query
export type CreateFolderRequestQuery = {
  parentFolderId?: Required<DirectorysTable['id']>; // 父级文件夹id
  folderName: DirectorysTable['name']; // 文件夹名称
};

// 创建文件夹接口-响应body
export type CreateFolderResponseBody = ResponseBody<{
  id: DirectorysTable['id']; // id
  name: DirectorysTable['name']; // 名称
  size: DirectorysTable['size']; // 大小
  type: DirectorysTable['type']; // 类型
  mimeType: DirectorysTable['mime_type']; // mime类型
  parentFolderId: DirectorysTable['id']; // 父级文件夹id
  createTime: number; // 创建日期时间戳
  modifiedTime: number; // 修改日期时间戳
}>;

// oss上传回调接口-响应body
export type UploadCallbackResponseBody = ResponseBody<{
  resourceFlag: string; // 资源标识
}>;
