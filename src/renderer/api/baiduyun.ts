import { useBaiduyunRequest } from '@/hooks/axios';
import type {
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
} from '@/types/api/baiduyun';

// access_token
// 123.e3c48c85fb93d655ab8d1afb31ea9eca.YaUuhqczd7yB2zSXUx_sWuqMvVB3AA1GPvpbU4Q.6iO5Xw

// localStorage.setItem(
//   'baiduyun_access_token',
//   '123.e3c48c85fb93d655ab8d1afb31ea9eca.YaUuhqczd7yB2zSXUx_sWuqMvVB3AA1GPvpbU4Q.6iO5Xw'
// );

// 认证接口
// https://openapi.baidu.com/oauth/2.0/authorize?client_id=IlLqBbU3GjQ0t46TRwFateTprHWl39zF&response_type=token&redirect_uri=oob&confirm_login=0&scope=basic,netdisk

useBaiduyunRequest({
  url: 'https://openapi.baidu.com/oauth/2.0/device/code?response_type=device_code&client_id=5GFgMRfHOhIvI0B8AZB78nt676FeWA9n&scope=basic,netdisk',
  method: 'get',
}).then((res) => {
  console.log('成功', res);
});

// # 开发者默认注册信息
// CLIENT_ID = "5GFgMRfHOhIvI0B8AZB78nt676FeWA9n"
// CLIENT_SECRET = "eq2eCNfbtOrGwdlA4vB1N1EaiwjBMu7i"

/**
 * @description: 百度云-搜索文件
 */
export function searchFile(params: ApiSearchFileRequest): Promise<ApiSearchFileResponse> {
  return useBaiduyunRequest({
    url: '/api/search',
    method: 'get',
    params: {
      clienttype: 0,
      web: 1, // web端
      order: 'time', // 排序规则
      desc: 1, // 返回详细信息
      num: params.num, // 每页条数
      page: params.page, // 当前页
      recursion: 1,
      key: params.key // 模糊搜索值
    }
  });
}

/**
 * @description: 百度云-获取列表数据
 */
export function getList(params: ApiGetListRequest): Promise<ApiGetListResponse> {
  return useBaiduyunRequest({
    url: '/api/list',
    method: 'get',
    params: {
      clienttype: 0,
      web: 1, // web端
      order: 'time', // 排序规则
      desc: 1, // 返回详细信息
      dir: params.dir, // 目录路径
      num: params.num, // 每页条数
      page: params.page // 当前页
    }
  });
}

/**
 * @description: 百度云-创建文件夹
 */
export function createDir(data: ApiCreateDirRequest): Promise<ApiCreateDirResponse> {
  return useBaiduyunRequest({
    url: '/api/create',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      a: 'commit',
      clienttype: 0,
      web: 1 // web端
    },
    data: {
      path: data.path, // 文件夹路径
      isdir: 1, // 是否文件夹
      block_list: []
    }
  });
}

/**
 * @description: 百度云-重命名文件
 */
export function renameFile(data: ApiRenameFileRequest): Promise<ApiRenameFileResponse> {
  return useBaiduyunRequest({
    url: '/api/filemanager',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      async: 2,
      onnest: 'fail',
      opera: 'rename', // 操作-重命名
      clienttype: 0,
      web: 1 // web端
    },
    data: {
      filelist: data.filelist // 文件信息列表
    }
  });
}

/**
 * @description: 百度云-删除文件
 */
export function deleteFile(data: ApiDeleteFileRequest): Promise<ApiDeleteFileResponse> {
  return useBaiduyunRequest({
    url: '/api/filemanager',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      async: 2,
      onnest: 'fail',
      opera: 'delete', // 操作-删除
      newVerify: 1,
      clienttype: 0,
      web: 1 // web端
    },
    data: {
      filelist: data.filelist // 文件信息列表
    }
  });
}

/**
 * @description: 百度云-获取下载地址
 */
export function getDownloadUrl(
  params: ApiGetDownloadUrlRequest
): Promise<ApiGetDownloadUrlResponse> {
  return useBaiduyunRequest({
    url: '/rest/2.0/xpan/multimedia',
    method: 'get',
    params: {
      method: 'filemetas',
      dlink: 1,
      fsids: encodeURIComponent(JSON.stringify(params.fsids)) // 文件id集合
    }
  });
}
