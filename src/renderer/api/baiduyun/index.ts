import { useElectronApi } from '@/hooks/electron';
import type { ApiGetFileListRequest, ApiGetFileListResponse } from '@/types/api/common/storage';
import type { ApiGetListResponse } from 'common/types/api/baiduyun';

const electronApi = useElectronApi();

/**
 * @description: 获取文件列表
 */
export async function getBaiduyunFileList(
  params: ApiGetFileListRequest
): Promise<ApiGetFileListResponse> {
  const res = await electronApi.baiduyun.getList({
    dir: params.parent,
    num: 100,
    page: 1
  });
  return {
    code: 200,
    data: {
      current: 1,
      size: 100,
      total: 0,
      records: res.list.map((item: ApiGetListResponse['list'][0]) => {
        return {
          path: item.path, // 路径
          parent: item.path.slice(0, item.path.lastIndexOf('/')), // 父级路径
          depth: item.path.split('/').length - 1, // 深度
          size: item.size, // 大小
          name: item.server_filename, // 名称
          type: item.isdir ? 'directory' : 'file', // 类型
          createdTime: item.local_ctime * 1000, // 创建时间戳
          updatedTime: item.local_mtime * 1000, // 更新时间戳
          readable: true, // 可读
          writable: true // 可写
        };
      })
    },
    msg: '请求成功',
    timestamp: Date.now()
  };
}
