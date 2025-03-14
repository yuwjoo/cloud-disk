import express from 'express';
import type { Server } from 'http';
import store from './config/proxyConfig';
import { corsMiddleware } from './middleware/corsMiddleware';
import { createProxyHandler } from './middleware/proxyMiddleware';

let server: Server | null = null;

export function setupProxyServer() {
  const app = express();
  app.use(express.json());

  // 使用CORS中间件
  app.use(corsMiddleware);

  // 代理路由
  app.use('/proxy-server', createProxyHandler);

  const proxyServerPort = store.get('proxyServerPort');

  // 启动服务器
  server = app.listen(proxyServerPort, () => {
    console.log(`Proxy server is running on http://localhost:${proxyServerPort}`);
  });
}

// 关闭服务器的方法
export function closeProxyServer() {
  if (server) {
    server.close();
    server = null;
  }
}
