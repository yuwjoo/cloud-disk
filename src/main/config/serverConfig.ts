import Store from "electron-store";

export interface ServerConfig {
  serverPort: number; // 服务器端口
  httpAgentUrl: string; // http agent代理地址
}

const store = new Store<ServerConfig>({
  name: "server-config",
  defaults: {
    serverPort: 30003,
    httpAgentUrl: "http://localhost:7890"
  }
});

export default store;
