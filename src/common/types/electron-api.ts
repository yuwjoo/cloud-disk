import {
  ApiCreateDirRequest,
  ApiCreateDirResponse,
  ApiDeleteFileRequest,
  ApiDeleteFileResponse,
  ApiGetDownloadUrlRequest,
  ApiGetDownloadUrlResponse,
  ApiGetListRequest,
  ApiGetListResponse,
  ApiRenameFileRequest,
  ApiRenameFileResponse,
  ApiSearchFileRequest,
  ApiSearchFileResponse
} from './api/baiduyun';

/**
 * @description: electron api
 */
export type ElectronApi = {
  desktop: boolean; // 是否桌面端
  version: string; // electron版本
  baiduyun: {
    searchFile(data: ApiSearchFileRequest): Promise<ApiSearchFileResponse>; // 模糊查询文件
    getList(data: ApiGetListRequest): Promise<ApiGetListResponse>; // 获取列表数据
    createDir(data: ApiCreateDirRequest): Promise<ApiCreateDirResponse>; // 创建文件夹
    renameFile(data: ApiRenameFileRequest): Promise<ApiRenameFileResponse>; // 重命名文件
    deleteFile(data: ApiDeleteFileRequest): Promise<ApiDeleteFileResponse>; // 删除文件
    getDownloadUrl(data: ApiGetDownloadUrlRequest): Promise<ApiGetDownloadUrlResponse>; // 获取下载地址
  }; // 百度云api
};
