import type { Request, Response, NextFunction } from 'express';
import { verifyUserToken } from './jwt';
import { createResponseJSON, enumCode } from './response';

/**
 * @description: 校验是否登录
 * @param {Request} req 请求
 * @param {Response} res 响应
 * @param {NextFunction} next 通过函数
 */
export async function isLogin(req: Request, res: Response, next: NextFunction) {
  const whiteList = ['/login'];
  const token = req.header('Authorization');

  if (whiteList.includes(req.url)) {
    // 白名单接口，跳过认证
    next();
  } else if (!token) {
    // token不存在
    res.json(createResponseJSON('', '用户未登录', enumCode.notLogin));
  } else if (await verifyUserToken(token)) {
    // 认证通过
    next();
  } else {
    // 认证失败
    res.json(createResponseJSON('', '无效的token', enumCode.tokenExpired));
  }
}

/**
 * @description: 处理跨域问题
 * @param {Request} req 请求
 * @param {Response} res 响应
 * @param {NextFunction} next 通过函数
 */
export async function handleCORS(req: Request, res: Response, next: NextFunction) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', '*');
  //允许的header类型
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With'
  );
  //跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
  if (req.method.toLowerCase() == 'options') {
    res.sendStatus(200).send(); //让options尝试请求快速结束
  } else {
    next();
  }
}
