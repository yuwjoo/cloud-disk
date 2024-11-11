import { useElectronApi } from '@/hooks/electron';
import type {
  ApiGetBaiduyunFileListRequest,
  ApiGetBaiduyunFileListResponse
} from '@/types/api/baiduyun';
import { RESPONSE_CODE } from '@/types/request';

/**
 * @description: 获取百度云文件列表
 */
export async function getBaiduyunFileList(
  params: ApiGetBaiduyunFileListRequest
): Promise<ApiGetBaiduyunFileListResponse> {
  const res = await useElectronApi().baiduyun.getList({
    dir: params.dir,
    num: params.size,
    page: params.current
  });
  return {
    code: RESPONSE_CODE.OK,
    data: {
      current: 1,
      size: 100,
      total: 0,
      records: res.list.map((item) => {
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
