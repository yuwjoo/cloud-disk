import { ResponseBody } from 'types/src/request/index';

export type GetDirectoryListRequestQuery = {
  folderPath?: string; // 文件夹路径
}; // 请求参数

export type GetDirectoryListResponseData = ResponseBody<{
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
}>; // 响应数据

export type CreateFileRequestQuery = {
  resourceFlag: string; // 资源标识
  filename: string; // 文件名
  parentFolderPath?: string; // 父级文件夹路径
}; // 请求参数

export type CreateFileResponseData = ResponseBody<{
  folderId: number; // 文件夹id
  fileData: {
    id: number; // id
    name: string; // 名称
    size: number; // 大小
    type: string; // 类型
    createTime: number; // 创日期时间戳
    modifiedTime: number; // 修改日期时间戳
  };
}>; // 响应数据

export type UploadCallbackResponseData = ResponseBody<{
  resourceFlag: string; // 资源标识
}>; // 响应数据

export type GetResourceFlagRequestQuery = {
  fileHash: string; // 文件hash
  fileSize: number; // 文件大小
}; // 请求参数

export type GetResourceFlagResponseData = ResponseBody<string>; // 响应数据

export type DownloadFileRequestQuery = {
  fileId?: number; // 文件id
}; // 请求参数

export type DownloadFileResponseData = ResponseBody<string>; // 响应数据

export {};
