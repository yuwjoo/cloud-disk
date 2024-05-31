export interface ResponseBody<T = any> {
    code: enumCode;
    res: T;
    msg: string;
}
export declare enum enumCode {
    success = 20200,// 请求成功
    error = 40400,// 请求错误
    tokenExpired = 40401,// token过期
    tokenFailure = 40402,// 无效token
    notLogin = 40403,// 未登录
    serverError = 50501
}
/**
 * @description: 创建响应json数据
 * @param {any} data 响应数据
 * @param {string} msg 提示消息
 * @param {enumCode} code 状态码
 */
export declare function createResponseJSON<T = any>(data: T, msg?: string, code?: enumCode): ResponseBody<T>;
