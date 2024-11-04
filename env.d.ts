/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string; // 网页标题
  readonly VITE_APP_SERVERURL: string; // 接口地址
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
