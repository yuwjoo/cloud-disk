import express from "express";
import type { Server } from "http";
import store from "@/main/config/serverConfig";
import { corsMiddleware } from "./middleware/corsMiddleware";
import router from "./router";

let server: Server | null = null;

/**
 * @description: 设置并启动Express服务器
 */
export function setupServer() {
  const app = express();
  const serverPort = store.get("serverPort");

  // 使用CORS中间件
  app.use(corsMiddleware);

  // 使用路由中间件，统一添加api前缀
  app.use("/api", router);

  // 启动服务器
  server = app.listen(serverPort, () => {
    console.log(`Proxy server is running on http://localhost:${serverPort}`);
  });
}

/**
 * @description: 关闭Express服务器
 */
export function closeServer() {
  if (server) {
    server.close();
  }
}
