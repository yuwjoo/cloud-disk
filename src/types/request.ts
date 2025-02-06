/**
 * @description: 响应码
 */
export enum RESPONSE_CODE {
  OK = 200, // 请求成功
  BAD_REQUEST = 400, // 请求错误
  UNAUTHORIZED = 401, // 未授权
  FORBIDDEN = 403, // 禁止访问
  NOT_FOUND = 404, // 资源未找到
  INTERNAL_SERVER_ERROR = 500 // 服务器错误
}

/**
 * @description: 基本响应体
 */
export interface CommonResponse<T = unknown> {
  code: number; // 状态码
  data: T; // 业务数据
  msg: string; // 响应信息
  timestamp: number; // 时间戳
}

/**
 * @description: 分页响应体
 */
export interface PageResponse<T, E = unknown> extends CommonResponse<PageData<T> & E> {}

/**
 * @description: 分页数据
 */
export interface PageData<T = unknown> {
  current: number; // 页码
  size: number; // 当前页条数
  total: number; // 总条数
  records: T[]; // 业务数据
}
