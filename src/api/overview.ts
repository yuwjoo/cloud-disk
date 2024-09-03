import request from '@/utils/request';
import type {
  CreateFileRequestBody,
  CreateFileResponseBody,
  GetDirectoryListRequestQuery,
  GetDirectoryListResponseBody,
  GetResourceFlagRequestQuery,
  GetResourceFlagResponseBody,
  DownloadFileRequestQuery,
  DownloadFileResponseBody,
  CreateFolderRequestQuery,
  CreateFolderResponseBody,
  DeleteFilesRequestBody,
  DeleteFilesResponseBody,
  RenameRequestQuery,
  RenameResponseBody
} from 'types/src/api/overview';

/**
 * @description: 获取文件列表
 * @param {GetDirectoryListRequestQuery} params 参数
 * @return {Promise<GetDirectoryListResponseBody>} 响应
 */
export function getDirectoryList(
  params?: GetDirectoryListRequestQuery
): Promise<GetDirectoryListResponseBody> {
  return request({
    url: '/fileSystem/getDirectoryList',
    method: 'get',
    params
  });
}

/**
 * @description: 创建文件
 * @param {CreateFileRequestBody} data 参数
 * @return {Promise<CreateFileResponseBody>} 响应
 */
export function createFile(data: CreateFileRequestBody): Promise<CreateFileResponseBody> {
  return request({
    url: '/fileSystem/createFile',
    method: 'post',
    data
  });
}

/**
 * @description: 创建文件夹
 * @param {CreateFolderRequestQuery} params 参数
 * @return {Promise<CreateFolderResponseBody>} 响应
 */
export function createFolder(params: CreateFolderRequestQuery): Promise<CreateFolderResponseBody> {
  return request({
    url: '/fileSystem/createFolder',
    method: 'get',
    params
  });
}

/**
 * @description: 获取资源标识
 * @param {GetResourceFlagRequestQuery} params 参数
 * @return {Promise<GetResourceFlagResponseBody>} 响应
 */
export function getResourceFlag(
  params: GetResourceFlagRequestQuery
): Promise<GetResourceFlagResponseBody> {
  return request({
    url: '/fileSystem/getResourceFlag',
    method: 'get',
    params
  });
}

/**
 * @description: 下载文件
 * @param {DownloadFileRequestQuery} params 参数
 * @return {Promise<DownloadFileResponseBody>} 响应
 */
export function downloadFile(params: DownloadFileRequestQuery): Promise<DownloadFileResponseBody> {
  return request({
    url: '/fileSystem/downloadFile',
    method: 'get',
    params
  });
}

/**
 * @description: 删除文件
 * @param {DeleteFilesRequestBody} data 参数
 * @return {Promise<DeleteFilesResponseBody>} 响应
 */
export function deleteFiles(data: DeleteFilesRequestBody): Promise<DeleteFilesResponseBody> {
  return request({
    url: '/fileSystem/deleteFiles',
    method: 'post',
    data
  });
}

/**
 * @description: 重命名文件
 * @param {RenameRequestQuery} params 参数
 * @return {Promise<RenameResponseBody>} 响应
 */
export function rename(params: RenameRequestQuery): Promise<RenameResponseBody> {
  return request({
    url: '/fileSystem/rename',
    method: 'get',
    params
  });
}
