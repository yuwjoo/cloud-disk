import { useBaiduyunAuthRequest, useBaiduyunRequest } from '@/hooks/axios';
import type {
  ApiCreateDirRequest,
  ApiCreateDirResponse,
  ApiDeleteFileRequest,
  ApiDeleteFileResponse,
  ApiDeviceCodeAuthResponse,
  ApiDeviceCodeToTokenRequest,
  ApiDeviceCodeToTokenResponse,
  ApiGetDownloadUrlRequest,
  ApiGetDownloadUrlResponse,
  ApiGetListRequest,
  ApiGetListResponse,
  ApiRefreshAccessTokenRequest,
  ApiRefreshAccessTokenResponse,
  ApiRenameFileRequest,
  ApiRenameFileResponse,
  ApiSearchFileRequest,
  ApiSearchFileResponse
} from '@/types/api/baiduyun';

const apps = [
  {
    AppKey: '5GFgMRfHOhIvI0B8AZB78nt676FeWA9n',
    SecretKey: 'eq2eCNfbtOrGwdlA4vB1N1EaiwjBMu7i'
  },
  {
    AppKey: 'EVaI5x0U6lEmP125G0Su55ROEXZtItdD',
    SecretKey: 'VPgfmrt8UBM5kgkeUemwRVmr5AjhFuEV'
  },
  {
    AppKey: 'IlLqBbU3GjQ0t46TRwFateTprHWl39zF',
    SecretKey: ''
  }
]; // 百度云开发者平台应用列表

/**
 * @description: 网页认证链接
 */
export function webAuthLink(): string {
  // force_login: 如传递“force_login=1”，则加载登录页时强制用户输入用户名和口令，不会从cookie中读取百度用户的登陆状态。
  // confirm_login: 如传递“confirm_login=1”且百度用户已处于登陆状态，会提示是否使用已当前登陆用户对应用授权。
  // login_type: 如传递“login_type=sms”，授权页面会默认使用短信动态密码注册登陆方式。
  // qrcode: 如传递“qrcode=1”，登录授权页面将增加扫码登录入口；注：扫码登录入口点击跳转至二维码页面，目前支持PC、TV、音箱、watch、kindle
  return `https://openapi.baidu.com/oauth/2.0/authorize?client_id=${apps[0].AppKey}&response_type=token&redirect_uri=oob&scope=basic,netdisk&force_login=1`;
}

/**
 * @description: 请求设备码授权
 */
export function deviceCodeAuth(): Promise<ApiDeviceCodeAuthResponse> {
  return useBaiduyunAuthRequest({
    url: '/device/code',
    method: 'get',
    params: {
      response_type: 'device_code',
      client_id: apps[0].AppKey,
      scope: 'basic,netdisk'
    }
  });
}

/**
 * @description: 通过设备码换取 Access Token
 */
export function deviceCodeToToken(
  params: ApiDeviceCodeToTokenRequest
): Promise<ApiDeviceCodeToTokenResponse> {
  return useBaiduyunAuthRequest({
    url: '/token',
    method: 'get',
    params: {
      grant_type: 'device_token',
      code: params.deviceCode,
      client_id: apps[0].AppKey,
      client_secret: apps[0].SecretKey
    }
  });
}

/**
 * @description: 刷新 Access Token
 */
export function refreshAccessToken(
  params: ApiRefreshAccessTokenRequest
): Promise<ApiRefreshAccessTokenResponse> {
  return useBaiduyunAuthRequest({
    url: '/token',
    method: 'get',
    params: {
      grant_type: 'refresh_token',
      refresh_token: params.refreshToken,
      client_id: apps[0].AppKey,
      client_secret: apps[0].SecretKey
    }
  });
}

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
