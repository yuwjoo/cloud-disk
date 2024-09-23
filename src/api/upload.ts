import { useRequest } from '@/librarys/axios';
import type { ApiGetMultiparts, ApiMergeMultipart, ApiPreCheckFile } from './types/upload';

/**
 * @description: 预检查文件
 */
export function preCheckFile(params: ApiPreCheckFile.Request): Promise<ApiPreCheckFile.Response> {
  return useRequest({
    url: '/api/upload/preCheckFile',
    method: 'get',
    params
  });
}

/**
 * @description: 获取分片集合
 */
export function getMultiparts(data: ApiGetMultiparts.Request): Promise<ApiGetMultiparts.Response> {
  return useRequest({
    url: '/api/upload/getMultiparts',
    method: 'post',
    data
  });
}

/**
 * @description: 合并上传的分片
 */
export function mergeMultipart(
  data: ApiMergeMultipart.Request
): Promise<ApiMergeMultipart.Response> {
  return useRequest({
    url: '/api/upload/mergeMultipart',
    method: 'post',
    data
  });
}
