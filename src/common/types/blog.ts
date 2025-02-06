export interface BlogData {
  id: string; // 唯一id
  title: string; // 标题
  describe: string; // 描述
  filePath: string; // 文件路径
}

export type BlogBroadcastEvent = (
  | {
      operate: 'add' | 'update';
      data: BlogData;
    }
  | {
      operate: 'delete';
      data: Pick<BlogData, 'id'>;
    }
)[];
