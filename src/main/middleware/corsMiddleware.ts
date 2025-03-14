import type { Request, Response, NextFunction } from "express";

// CORS中间件
export function corsMiddleware(req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
}