import type { Request, Response, NextFunction } from "express";

/**
 * @description: CORS中间件，处理跨域请求
 * @param {Request} req Express请求对象
 * @param {Response} res Express响应对象
 * @param {NextFunction} next Express下一个中间件函数
 */
export function corsMiddleware(req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
}
