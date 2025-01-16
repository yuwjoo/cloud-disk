import path from 'path';

export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'; // 是否开发环境

export const PRELOAD_PATH = path.join(__dirname, './preload.js'); // 预加载文件路径

export const RENDERER_PATH = path.join(__dirname, '../renderer'); // 渲染进程路径
