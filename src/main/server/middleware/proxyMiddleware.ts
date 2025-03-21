import type { Request, Response } from "express";
import { createProxyMiddleware, type Options, type RequestHandler } from "http-proxy-middleware";
import { HttpsProxyAgent } from "https-proxy-agent";
import store from "@/main/config/serverConfig";

export interface ProxyServerParams {
  target: string; // 访问地址
}

export const proxyServerHeaderPrefix = "x-proxy-server-"; // 反向代理服务器自定义header前缀

let proxyServerInstance: RequestHandler | null = null; // 反向代理服务器实例

/**
 * @description: 创建代理中间件实例
 * @return {RequestHandler} 代理中间件实例
 */
export function createProxyInstance(): RequestHandler {
  const agent = store.get("httpAgentUrl") ? new HttpsProxyAgent(store.get("httpAgentUrl")) : null;

  const options: Options = {
    router: (req) => (req as Request<any, any, any, ProxyServerParams>).query.target,
    changeOrigin: true,
    ignorePath: true,
    agent,
    logger: console,
    on: {
      proxyRes: (proxyRes) => {
        // 删除接口返回的跨域header，则后续返回的就是服务器配置的跨域header
        delete proxyRes.headers["access-control-allow-origin"];
        delete proxyRes.headers["access-control-allow-methods"];
        delete proxyRes.headers["access-control-allow-meaders"];
      }
    }
  };

  return createProxyMiddleware(options);
}

/**
 * @description: 获取或创建代理实例
 * @return {RequestHandler} 代理中间件实例
 */
export function getProxyInstance(): RequestHandler {
  if (!proxyServerInstance) {
    proxyServerInstance = createProxyInstance();
  }
  return proxyServerInstance;
}

/**
 * @description: 更新代理实例配置
 * @return {RequestHandler} 新的代理中间件实例
 */
export function updateProxyInstance(): RequestHandler {
  if (proxyServerInstance) {
    proxyServerInstance = null;
  }
  proxyServerInstance = createProxyInstance();
  return proxyServerInstance;
}

/**
 * @description: Express代理中间件函数
 * @param {Request} req Express请求对象，包含代理目标URL
 * @param {Response} res Express响应对象
 */
export function proxyMiddleware(req: Request<any, any, any, ProxyServerParams>, res: Response) {
  if (!req.query.target) {
    res.status(400).json({ error: "Target URL is required" });
    return;
  }

  try {
    new URL(req.query.target);
  } catch (error) {
    res.status(400).json({ error: "Invalid target URL" });
    return;
  }

  Object.keys(req.headers).forEach((key) => {
    if (key.startsWith(proxyServerHeaderPrefix)) {
      req.headers[key.replace(proxyServerHeaderPrefix, "")] = req.headers[key];
      delete req.headers[key];
    }
  });

  getProxyInstance()(req, res);
}
