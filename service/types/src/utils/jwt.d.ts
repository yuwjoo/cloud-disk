import type { JwtPayload } from 'jsonwebtoken';
/**
 * @description: 创建用户token
 * @param {Record<string, string | number>} data 额外信息
 * @return {Promise<string>} token
 */
export declare function createUserToken(data?: Record<string, string | number>): Promise<string>;
/**
 * @description: 校验用户token
 * @param {string} token token
 * @return {Promise<JwtPayload>} token信息
 */
export declare function verifyUserToken(token: string): Promise<JwtPayload>;
