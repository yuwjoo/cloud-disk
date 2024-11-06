import { ipcRenderer } from 'electron';
import {
  BAIDUYUN_CREATE_DIR,
  BAIDUYUN_DELETE_FILE,
  BAIDUYUN_GET_DOWNLOAD_URL,
  BAIDUYUN_GET_LIST,
  BAIDUYUN_RENAME_FILE,
  BAIDUYUN_SEARCH_FILE
} from 'common/ipc-constants';
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
} from 'common/types/api/baiduyun';

/**
 * @description: 百度云-查询文件
 */
export function searchFile(data: ApiSearchFileRequest): Promise<ApiSearchFileResponse> {
  return ipcRenderer.invoke(BAIDUYUN_SEARCH_FILE, data);
}

/**
 * @description: 百度云-获取列表数据
 */
export function getList(data: ApiGetListRequest): Promise<ApiGetListResponse> {
  return ipcRenderer.invoke(BAIDUYUN_GET_LIST, data);
}

/**
 * @description: 百度云-创建文件夹
 */
export function createDir(data: ApiCreateDirRequest): Promise<ApiCreateDirResponse> {
  return ipcRenderer.invoke(BAIDUYUN_CREATE_DIR, data);
}

/**
 * @description: 百度云-重命名文件
 */
export function renameFile(data: ApiRenameFileRequest): Promise<ApiRenameFileResponse> {
  return ipcRenderer.invoke(BAIDUYUN_RENAME_FILE, data);
}

/**
 * @description: 百度云-删除文件
 */
export function deleteFile(data: ApiDeleteFileRequest): Promise<ApiDeleteFileResponse> {
  return ipcRenderer.invoke(BAIDUYUN_DELETE_FILE, data);
}

/**
 * @description: 百度云-获取下载地址
 */
export function getDownloadUrl(data: ApiGetDownloadUrlRequest): Promise<ApiGetDownloadUrlResponse> {
  return ipcRenderer.invoke(BAIDUYUN_GET_DOWNLOAD_URL, data);
}
