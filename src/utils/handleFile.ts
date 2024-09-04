import folder from '@/assets/images/fileSystem/small/folder.png';
import compressedFile from '@/assets/images/fileSystem/small/compressedFile.png';
import docmentFile from '@/assets/images/fileSystem/small/docmentFile.png';
import executionFile from '@/assets/images/fileSystem/small/executionFile.png';
import pdfFile from '@/assets/images/fileSystem/small/pdfFile.png';

/**
 * @description: 获取封面
 * @param {string} cover 封面地址
 * @return {string} 封面
 */
export function getCover(cover: string): string {
  switch (cover) {
    case 'localhost://folder.png':
      return folder;
    case 'localhost://compressedFile.png':
      return compressedFile;
    case 'localhost://executionFile.png':
      return executionFile;
    case 'localhost://pdfFile.png':
      return pdfFile;
    case 'localhost://docmentFile.png':
      return docmentFile;
    default:
      return cover;
  }
}

/**
 * @description: 获取大小字符
 * @param {number} size 大小（字节）
 * @return {string} 大小字符
 */
export function getSizeStr(size: number): string {
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
