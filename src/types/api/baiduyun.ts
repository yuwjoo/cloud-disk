/**
 * @description: 设备码授权-响应数据
 */
export type ApiDeviceCodeAuthResponse = {
  device_code: string; // 设备码
  user_code: string; // 用户码
  verification_url: string; // 用户输入 user code 进行授权的 url
  qrcode_url: string; // 二维码url
  expires_in: number; // device_code 的过期时间，单位：秒
  interval: number; // device_code 换 Access Token 轮询间隔时间，单位：秒
};

/**
 * @description: 通过设备码换取 Access Token-请求数据
 */
export type ApiDeviceCodeToTokenRequest = {
  deviceCode: string; // 设备码
};

/**
 * @description: 通过设备码换取 Access Token-响应数据
 */
export type ApiDeviceCodeToTokenResponse = {
  expires_in: number; // Access Token的有效期，单位为秒
  refresh_token: string; // 用于刷新 Access Token, 有效期为10年
  access_token: string; // 获取到的Access Token，Access Token是调用网盘开放API访问用户授权资源的凭证
  scope: string; // Access Token 最终的访问权限，即用户的实际授权列表
};

/**
 * @description: 刷新 Access Token-请求数据
 */
export type ApiRefreshAccessTokenRequest = {
  refreshToken: string; // Refresh Token
};

/**
 * @description: 刷新 Access Token-响应数据
 */
export type ApiRefreshAccessTokenResponse = {
  expires_in: number; // Access Token的有效期，单位为秒
  refresh_token: string; // 用于刷新 Access Token, 有效期为10年
  access_token: string; // 获取到的Access Token，Access Token是调用网盘开放API访问用户授权资源的凭证
  scope: string; // Access Token 最终的访问权限，即用户的实际授权列表
};

/**
 * @description: 搜索文件-请求数据
 */
export type ApiSearchFileRequest = {
  key: string; // 模糊搜索值
  num: number; // 每页条数
  page: number; // 当前页
};

/**
 * @description: 搜索文件-响应数据
 */
export type ApiSearchFileResponse = {
  errno: number; // 状态码。0：成功
  list: [
    {
      category: number;
      extent_tinyint1: number;
      fs_id: number; // 文件id
      isdir: 0 | 1; // 是否文件夹
      local_ctime: number;
      local_mtime: number;
      md5: string; // md5
      oper_id: number;
      owner_id: number;
      path: string; // 路径
      server_ctime: number;
      server_filename: string; // 文件名称
      server_mtime: number;
      share: number;
      size: number; // 文件大小
      wpfile: number;
      delete_type: number;
      from_type: number;
      thumbs: {
        icon: string; // 迷你封面
        url3: string; // 大封面
        url2: string; // 中封面
        url1: string; // 小封面
      };
      docpreview: string;
      ptype: string;
      fold: number;
      score: number;
      relevance_level: number;
    }
  ];
  request_id: number; // 请求id
  has_more: number;
  display_count: number;
};

/**
 * @description: 获取列表数据-请求数据
 */
export type ApiGetListRequest = {
  dir: string; // 目录路径
  num: number; // 每页条数
  page: number; // 当前页
};

/**
 * @description: 获取列表数据-响应数据
 */
export type ApiGetListResponse = {
  errno: number; // 状态码。0：成功
  guid_info: string;
  list: {
    tkbind_id: number;
    owner_type: number;
    category: number;
    is_scene: 0 | 1;
    isdir: 0 | 1; // 是否文件夹
    dir_empty: 0 | 1; // 是否空文件夹
    from_type: number;
    oper_id: number;
    server_ctime: number;
    extent_tinyint7: number;
    wpfile: number;
    local_mtime: number;
    size: number; // 大小
    server_atime: number;
    path: string; // 路径
    share: number;
    real_category: string;
    pl: number;
    local_ctime: number;
    server_mtime: number;
    empty: number;
    owner_id: number;
    server_filename: string; // 名称
    unlist: number;
    fs_id: number; // 文件id
    thumbs?: {
      icon: string; // 迷你封面
      url3: string; // 大封面
      url2: string; // 中封面
      url1: string; // 小封面
    };
  }[];
  request_id: number; // 请求id
  guid: number;
};

/**
 * @description: 创建文件夹-请求参数
 */
export type ApiCreateDirRequest = {
  path: string; // 文件夹路径
};

/**
 * @description: 创建文件夹-响应数据
 */
export type ApiCreateDirResponse = {
  errno: number; // 状态码。0：成功
  ctime: number; // 创建时间戳
  fs_id: number; // 文件id
  isdir: 0 | 1; // 是否文件夹
  mtime: number; // 修改时间戳
  path: string; // 文件路径
  status: number;
  name: string; // 文件名称
  category: number;
};

/**
 * @description: 重命名文件-请求参数
 */
export type ApiRenameFileRequest = {
  filelist: {
    id: number; // 文件id
    path: string; // 文件路径
    newname: string; // 新名称
  }[];
};

/**
 * @description: 重命名文件-响应数据
 */
export type ApiRenameFileResponse = {
  errno: number; // 状态码。0：成功
  info: [];
  request_id: number; // 请求id
  taskid: number;
};

/**
 * @description: 删除文件-请求参数
 */
export type ApiDeleteFileRequest = {
  filelist: string[]; // 文件路径列表
};

/**
 * @description: 删除文件-响应数据
 */
export type ApiDeleteFileResponse = {
  errno: number; // 状态码。0：成功
  info: [];
  request_id: number; // 请求id
  taskid: number;
};

/**
 * @description: 获取下载地址-请求参数
 */
export type ApiGetDownloadUrlRequest = {
  fsids: number[]; // 文件id集合
};

/**
 * @description: 获取下载地址-响应数据
 */
export type ApiGetDownloadUrlResponse = {
  errmsg: string; // 异常消息
  errno: number; // 状态码。0：成功
  list: {
    category: number;
    dlink: string; // 下载链接
    filename: string; // 文件名称
    fs_id: number; // 文件id
    isdir: 0 | 1; // 是否文件夹
    local_ctime: number; // 创建时间戳
    local_mtime: number; // 修改时间戳
    md5: string; // md5
    oper_id: number;
    path: string; // 路径
    server_ctime: number;
    server_mtime: number;
    size: number; // 文件大小
  }[];
  names: {};
  request_id: number; // 请求id
};
