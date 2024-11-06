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
import { AddListener, RemoveAllListener, RemoveListener } from './electron-listener';

/**
 * @description: electron api
 */
export interface ElectronApi {
  desktop: boolean; // 是否桌面端
  version: string; // electron版本
  addListener: AddListener; // 监听事件
  removeListener: RemoveListener; // 移除事件
  removeAllListener: RemoveAllListener; // 移除所有事件
  window: WindowApi; // 窗口api
  baiduyun: BaiduyunApi; // 百度云api
}

/**
 * @description: 窗口api
 */
export interface WindowApi {
  maximize(): void; // 最大化
  minimize(): void; // 最小化
  restore(): void; // 还原
  close(): void; // 关闭
  toggleFullScreen(isFull?: boolean): void; // 切换全屏状态
}

/**
 * @description: 百度云api
 */
export interface BaiduyunApi {
  searchFile(data: ApiSearchFileRequest): Promise<ApiSearchFileResponse>; // 模糊查询文件
  getList(data: ApiGetListRequest): Promise<ApiGetListResponse>; // 获取列表数据
  createDir(data: ApiCreateDirRequest): Promise<ApiCreateDirResponse>; // 创建文件夹
  renameFile(data: ApiRenameFileRequest): Promise<ApiRenameFileResponse>; // 重命名文件
  deleteFile(data: ApiDeleteFileRequest): Promise<ApiDeleteFileResponse>; // 删除文件
  getDownloadUrl(data: ApiGetDownloadUrlRequest): Promise<ApiGetDownloadUrlResponse>; // 获取下载地址
}
