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
} from 'common/types/api/baiduyun';
import axios from 'axios';

// access_token
// 123.e3c48c85fb93d655ab8d1afb31ea9eca.YaUuhqczd7yB2zSXUx_sWuqMvVB3AA1GPvpbU4Q.6iO5Xw

/**
 * @description: 搜索文件
 */
export function searchFile(params: ApiSearchFileRequest): Promise<ApiSearchFileResponse> {
  return axios({
    baseURL: 'https://pan.baidu.com',
    url: '/api/search',
    method: 'get',
    headers: {
      'User-Agent': 'pan.baidu.com'
    },
    params: {
      clienttype: 0,
      web: 1, // web端
      order: 'time', // 排序规则
      desc: 1, // 返回详细信息
      num: params.num, // 每页条数
      page: params.page, // 当前页
      recursion: 1,
      key: params.key, // 模糊搜索值
      access_token: localStorage.getItem('baiduyun_access_token') // accessToken
    }
  });
}

/**
 * @description: 获取列表数据
 */
export function getList(params: ApiGetListRequest): Promise<ApiGetListResponse> {
  return axios({
    baseURL: 'https://pan.baidu.com',
    url: '/api/list',
    method: 'get',
    headers: {
      'User-Agent': 'pan.baidu.com'
    },
    params: {
      clienttype: 0,
      web: 1, // web端
      order: 'time', // 排序规则
      desc: 1, // 返回详细信息
      dir: params.dir, // 目录路径
      num: params.num, // 每页条数
      page: params.page, // 当前页
      access_token:
        '123.e3c48c85fb93d655ab8d1afb31ea9eca.YaUuhqczd7yB2zSXUx_sWuqMvVB3AA1GPvpbU4Q.6iO5Xw' // accessToken
    }
  })
    .then((res) => {
      console.log('成功', res);
      return res.data;
    })
    .catch((err) => {
      console.log('失败', err);
    });
}

/**
 * @description: 创建文件夹
 */
export function createDir(data: ApiCreateDirRequest): Promise<ApiCreateDirResponse> {
  return axios({
    baseURL: 'https://pan.baidu.com',
    url: '/api/create',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'pan.baidu.com'
    },
    params: {
      a: 'commit',
      clienttype: 0,
      web: 1, // web端
      access_token: localStorage.getItem('baiduyun_access_token') // accessToken
    },
    data: {
      path: data.path, // 文件夹路径
      isdir: 1, // 是否文件夹
      block_list: []
    }
  });
}

/**
 * @description: 重命名文件
 */
export function renameFile(data: ApiRenameFileRequest): Promise<ApiRenameFileResponse> {
  return axios({
    baseURL: 'https://pan.baidu.com',
    url: '/api/filemanager',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'pan.baidu.com'
    },
    params: {
      async: 2,
      onnest: 'fail',
      opera: 'rename', // 操作-重命名
      clienttype: 0,
      web: 1, // web端
      access_token: localStorage.getItem('baiduyun_access_token') // accessToken
    },
    data: {
      filelist: data.filelist // 文件信息列表
    }
  });
}

/**
 * @description: 删除文件
 */
export function deleteFile(data: ApiDeleteFileRequest): Promise<ApiDeleteFileResponse> {
  return axios({
    baseURL: 'https://pan.baidu.com',
    url: '/api/filemanager',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'pan.baidu.com'
    },
    params: {
      async: 2,
      onnest: 'fail',
      opera: 'delete', // 操作-删除
      newVerify: 1,
      clienttype: 0,
      web: 1, // web端
      access_token: localStorage.getItem('baiduyun_access_token') // accessToken
    },
    data: {
      filelist: data.filelist // 文件信息列表
    }
  });
}

/**
 * @description: 获取下载地址
 */
export function getDownloadUrl(
  params: ApiGetDownloadUrlRequest
): Promise<ApiGetDownloadUrlResponse> {
  return axios({
    baseURL: 'https://pan.baidu.com',
    url: '/rest/2.0/xpan/multimedia',
    method: 'get',
    headers: {
      'User-Agent': 'pan.baidu.com'
    },
    params: {
      method: 'filemetas',
      dlink: 1,
      fsids: encodeURIComponent(JSON.stringify(params.fsids)), // 文件id集合
      access_token: localStorage.getItem('baiduyun_access_token') // accessToken
    }
  });
}
