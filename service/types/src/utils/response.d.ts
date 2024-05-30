export declare enum enumCode {
    success = 20200,// 请求成功
    tokenExpired = 40401,// token过期
    tokenFailure = 40402,// 无效token
    notLogin = 40403,// 未登录
    error = 50501
}
/**
 * @description: 创建响应json数据
 * @param {any} data 响应数据
 * @param {string} msg 提示消息
 * @param {enumCode} code 状态码
 */
export declare function createResponseJSON(data: any, msg?: string, code?: enumCode): {
    code: enumCode;
    res: any;
    msg: string;
};
