export default {
  port: 3000, // 服务监听端口号
  tokenExpirationTime: '1h', // token过期时间
  dbPath: './CLOUD_DISK.db', // 数据库文件路径
  apiWhiteList: ['/login'] // 接口白名单(不触发身份认证)
};
