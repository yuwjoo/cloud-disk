import { ResponseBody } from 'types/src/request/index';

export type GetDirectoryListRequestQuery = {
  folderId?: number; // 文件夹id
}; // 请求参数

export type GetDirectoryListResponseData = ResponseBody<{
  folderId: number; // 文件夹id
  list: {
    id: number; // id
    name: string; // 名称
    size: number; // 大小
    type: string; // 类型
    createTime: number; // 创日期时间戳
    modifiedTime: number; // 修改日期时间戳
  }[];
}>; // 响应数据

export type CreateFileRequestQuery = {
  resourceFlag: string; // 资源标识
  fileName: string; // 文件名
  folderId?: number; // 文件夹id
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

export type GetResourceFlagResponseData = ResponseBody<{
  resourceFlag?: string; // 资源标识
}>; // 响应数据

export type DownloadFileRequestQuery = {
  fileId?: number; // 文件id
}; // 请求参数

export type DownloadFileResponseData = ResponseBody<string>; // 响应数据

export {};
