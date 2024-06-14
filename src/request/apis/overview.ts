import type {
  BatchCreateFileReqParams,
  BatchCreateFileResData,
  GetFileListReqParams,
  GetFileListResData
} from 'types/src/request/apis/overview';
import { request } from '..';

/**
 * @description: 获取文件列表
 * @param {GetFileListReqParams} params 参数
 * @return {Promise<GetFileListResData>} 响应
 */
export function getFileList(params: GetFileListReqParams): Promise<GetFileListResData> {
  return request({
    url: '/fileSystem/getFileList',
    method: 'get',
    params
  });
}

/**
 * @description: 批量创建文件
 * @param {BatchCreateFileReqParams} data 参数
 * @return {Promise<BatchCreateFileResData>} 响应
 */
export function batchCreateFile(data: BatchCreateFileReqParams): Promise<BatchCreateFileResData> {
  return request({
    url: '/fileSystem/batchCreateFile',
    method: 'post',
    data
  });
}
