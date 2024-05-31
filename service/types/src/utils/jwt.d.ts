import type { JwtPayload } from 'jsonwebtoken';
import type { UsersTable } from './database';
export type UserParams = {
    id: UsersTable['id'];
    password: UsersTable['password'];
};
export type JwtUserPayload = UserParams & JwtPayload;
/**
 * @description: 创建用户token
 * @param {UserParams} data 额外信息
 * @return {Promise<string>} token
 */
export declare function createUserToken(data: UserParams): Promise<string>;
/**
 * @description: 校验用户token
 * @param {string} token token
 * @return {Promise<JwtUserPayload>} token信息
 */
export declare function verifyUserToken(token: string): Promise<JwtUserPayload>;
