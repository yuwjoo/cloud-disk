import { ipcMain } from 'electron';
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
import {
  createDir,
  deleteFile,
  getDownloadUrl,
  getList,
  renameFile,
  searchFile
} from '@/api/baiduyun';

/**
 * @description: 百度云-查询文件
 */
ipcMain.handle(
  BAIDUYUN_SEARCH_FILE,
  (_event, data: ApiSearchFileRequest): Promise<ApiSearchFileResponse> => {
    return searchFile(data);
  }
);

/**
 * @description: 百度云-获取列表数据
 */
ipcMain.handle(
  BAIDUYUN_GET_LIST,
  (_event, data: ApiGetListRequest): Promise<ApiGetListResponse> => {
    return getList(data);
  }
);

/**
 * @description: 百度云-创建文件夹
 */
ipcMain.handle(
  BAIDUYUN_CREATE_DIR,
  (_event, data: ApiCreateDirRequest): Promise<ApiCreateDirResponse> => {
    return createDir(data);
  }
);

/**
 * @description: 百度云-重命名文件
 */
ipcMain.handle(
  BAIDUYUN_RENAME_FILE,
  (_event, data: ApiRenameFileRequest): Promise<ApiRenameFileResponse> => {
    return renameFile(data);
  }
);

/**
 * @description: 百度云-删除文件
 */
ipcMain.handle(
  BAIDUYUN_DELETE_FILE,
  (_event, data: ApiDeleteFileRequest): Promise<ApiDeleteFileResponse> => {
    return deleteFile(data);
  }
);

/**
 * @description: 百度云-获取下载地址
 */
ipcMain.handle(
  BAIDUYUN_GET_DOWNLOAD_URL,
  (_event, data: ApiGetDownloadUrlRequest): Promise<ApiGetDownloadUrlResponse> => {
    return getDownloadUrl(data);
  }
);
