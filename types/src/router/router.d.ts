import 'vue-router';

export {};

declare module 'vue-router' {
  interface RouteMeta {
    haveAside?: boolean; // 是否需要侧边栏
  }
}
