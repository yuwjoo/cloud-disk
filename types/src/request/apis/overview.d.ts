import { ResponseBody } from 'types/src/request/index';

export type GetFileListResDataFileList = {
  id: number; // id
  name: string; // 名称
  type: 'dir' | 'file'; // 类型，dir: 目录; file: 文件
  size: number; // 大小
  modifiedTime: number; // 修改日期时间戳
}[];

// 请求参数
export type GetFileListReqParams = {
  parentId?: number; // 父级id
};

// 响应数据
export type GetFileListResData = ResponseBody<{
  parentId?: number; // 父级id
  list: GetFileListResDataFileList; // 文件列表
}>;

// 请求参数
export type BatchCreateFileReqParams = {
  directoryId?: number; // 目录id
  fileList: {
    name: string; // 文件名
    size: number; // 文件大小
    ossPath: string; // oss文件路径
  }[];
};

// 响应数据
export type BatchCreateFileResData = ResponseBody<void>;

export {};
