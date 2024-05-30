import type { Request, Response, NextFunction } from 'express';
/**
 * @description: 校验是否登录
 * @param {Request} req 请求
 * @param {Response} res 响应
 * @param {NextFunction} next 通过函数
 */
export declare function isLogin(req: Request, res: Response, next: NextFunction): Promise<void>;
