import folder from '@/assets/images/fileSystem/small/folder.png';
import compressedFile from '@/assets/images/fileSystem/small/compressedFile.png';
import docmentFile from '@/assets/images/fileSystem/small/docmentFile.png';
import executionFile from '@/assets/images/fileSystem/small/executionFile.png';
import pdfFile from '@/assets/images/fileSystem/small/pdfFile.png';
import { useUserStore } from '@/store/user';

/**
 * @description: 获取文件封面
 * @param {string} path 文件路径
 * @param {string} type 文件类型
 * @return {string} 文件封面
 */
export function getFileCover(path: string, type: string): string {
  if (type === 'directory') return folder;
  const suffix = path.match(/\.([^.]*)$/)?.[1].toLocaleLowerCase();

  switch (suffix) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'webp':
      return `${import.meta.env.VITE_APP_SERVERURL}/api/storage/getFileCover?token=${encodeURIComponent(useUserStore().token)}&path=${encodeURIComponent(path)}`;
    case 'zip':
    case '7z':
    case 'rar':
      return compressedFile;
    case 'exe':
      return executionFile;
    case 'pdf':
      return pdfFile;
    case 'txt':
    case 'html':
      return docmentFile;
    default:
      return docmentFile;
  }
}

/**
 * @description: 获取文件大小
 * @param {number} size 大小（字节）
 * @return {string} 文件大小
 */
export function getFileSize(size: number): string {
  if (size < 1024) {
    return `${size}B`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)}KB`;
  } else if (size < 1024 * 1024 * 1024) {
    return `${(size / 1024 / 1024).toFixed(2)}MB`;
  } else {
    return `${(size / 1024 / 1024 / 1024).toFixed(2)}GB`;
  }
}
