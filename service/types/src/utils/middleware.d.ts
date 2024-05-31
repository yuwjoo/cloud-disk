import type { Request, Response, NextFunction } from 'express';
import type { JwtUserPayload } from './jwt';
/**
 * @description: 身份验证
 * @param {Request} req 请求
 * @param {Response} res 响应
 * @param {NextFunction} next 通过函数
 */
export declare function authorization(req: Request, res: Response<any, JwtUserPayload>, next: NextFunction): Promise<void>;
/**
 * @description: 处理跨域
 * @param {Request} req 请求
 * @param {Response} res 响应
 * @param {NextFunction} next 通过函数
 */
export declare function handleCORS(req: Request, res: Response, next: NextFunction): Promise<void>;
