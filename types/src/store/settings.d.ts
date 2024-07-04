export interface Settings {
  // 侧边栏相关
  aside: {
    isCollapsed: boolean; // 是否折叠
  };
  // 主题相关
  theme: {
    mode: 'followSystem' | 'dark' | 'light'; // 主题模式：followSystem（跟随系统），dark（深色系），light（浅色系）
  };
}
