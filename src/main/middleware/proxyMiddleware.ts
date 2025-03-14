import type { Request, Response } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { HttpProxyAgent } from "http-proxy-agent";
import store from "../config/proxyConfig";
import axios from "axios";

// 缓存当前的agent实例
let currentAgent: HttpProxyAgent<string> | null = null;
let currentProxyAgentUrl: string | null = null;

// 更新agent实例
function updateAgent() {
  const proxyAgentUrl = store.get("proxyAgentUrl");

  if (!proxyAgentUrl) {
    currentAgent = null;
    currentProxyAgentUrl = null;
    return;
  }

  if (proxyAgentUrl !== currentProxyAgentUrl) {
    currentAgent = new HttpProxyAgent(proxyAgentUrl);
    currentProxyAgentUrl = proxyAgentUrl;
  }
}

// 代理中间件
export function createProxyHandler(req: Request, res: Response) {
  let target = req.query.target as string;

  if (!target && req.body) {
    target = req.body.target;
  }

  if (!target) {
    res.status(400).json({ error: "Target URL is required" });
    return;
  }

  try {
    new URL(target);
  } catch (error) {
    res.status(400).json({ error: "Invalid target URL" });
    return;
  }

  // axios({
  //   url: target,
  //   method: "get"
  // }).then(
  //   (res) => {
  //     console.log("请求成功", res);
  //   },
  //   (err) => {
  //     console.log("请求异常", err);
  //   }
  // );

  // 确保agent是最新的
  updateAgent();

  const proxy = createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: () => "",
    agent: currentAgent,
    // secure: false,
    // autoRewrite: true,
    on: {
      proxyReq: (proxyReq, req, res) => {
        // const local = `${proxyReq.protocol}//${proxyReq.host}`;
        // proxyReq.setHeader("referer", local);
        // proxyReq.setHeader("origin", local);
        proxyReq.removeHeader("referer");
        proxyReq.removeHeader("origin");
      },
      proxyRes: (proxyRes, req, res) => {
        // 删除影响跨域的header
        delete proxyRes.headers["access-control-allow-origin"];
        delete proxyRes.headers["access-control-allow-methods"];
        delete proxyRes.headers["access-control-allow-meaders"];
      }
    }
  });

  proxy(req, res);
}
