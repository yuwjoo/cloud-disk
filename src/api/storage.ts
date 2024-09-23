import { useRequest } from '@/librarys/axios';
import type {
  ApiCreateFile,
  ApiDeleteFile,
  ApiGetFileList,
  ApiMoveFile,
  ApiRenameFile
} from './types/storage';

/**
 * @description: 获取文件列表
 */
export function getFileList(params: ApiGetFileList.Request): Promise<ApiGetFileList.Response> {
  return useRequest({
    url: '/api/storage/list',
    method: 'get',
    params
  });
}

/**
 * @description: 创建文件/目录
 */
export function createFile(data: ApiCreateFile.Request): Promise<ApiCreateFile.Response> {
  return useRequest({
    url: '/api/storage/create',
    method: 'post',
    data
  });
}

/**
 * @description: 重命名文件/目录
 */
export function renameFile(data: ApiRenameFile.Request): Promise<ApiRenameFile.Response> {
  return useRequest({
    url: '/api/storage/rename',
    method: 'post',
    data
  });
}

/**
 * @description: 移动文件/目录
 */
export function moveFile(data: ApiMoveFile.Request): Promise<ApiMoveFile.Response> {
  return useRequest({
    url: '/api/storage/move',
    method: 'post',
    data
  });
}

/**
 * @description: 删除文件/目录
 */
export function deleteFile(data: ApiDeleteFile.Request): Promise<ApiDeleteFile.Response> {
  return useRequest({
    url: '/api/storage/delete',
    method: 'post',
    data
  });
}
