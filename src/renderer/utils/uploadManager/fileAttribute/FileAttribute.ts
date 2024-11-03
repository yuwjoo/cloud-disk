export type FileAttributeOptions = {
  uploadPath: string;
  uploadName: string;
};

export class FileAttribute {
  file: File; // 原始文件
  uploadPath: string; // 上传路径
  uploadName: string; // 上传名称

  // 获取hash
  get hash(): string {
    return (this.file as any).hash || '';
  }

  // 设置hash
  set hash(val) {
    (this.file as any).hash = val;
  }

  // 获取名称
  get name(): string {
    return this.uploadName || this.file.name;
  }

  // 获取大小
  get size(): number {
    return this.file.size;
  }

  // 获取类型
  get type(): string {
    return this.file.type || 'application/octet-stream';
  }

  constructor(file: File, options: FileAttributeOptions) {
    this.file = file;
    this.uploadPath = options.uploadPath;
    this.uploadName = options.uploadName;
  }
}
