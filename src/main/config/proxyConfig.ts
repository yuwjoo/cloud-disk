import Store from 'electron-store';

export interface ProxyConfig {
  proxyServerPort: number;
  proxyAgentUrl: string;
}

const store = new Store<ProxyConfig>({
  name: 'proxy-config',
  defaults: {
    proxyServerPort: 30003, // 反向代理服务器端口
    proxyAgentUrl: 'http://localhost:7890' // 请求代理服务器地址
  }
});

export default store;