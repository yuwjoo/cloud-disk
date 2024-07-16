import folder from '@/assets/images/fileSystem/small/folder.png';
import apkFile from '@/assets/images/fileSystem/small/apkFile.png';
import compressedFile from '@/assets/images/fileSystem/small/compressedFile.png';
import docmentFile from '@/assets/images/fileSystem/small/docmentFile.png';
import executionFile from '@/assets/images/fileSystem/small/executionFile.png';
import musicFile from '@/assets/images/fileSystem/small/musicFile.png';
import pdfFile from '@/assets/images/fileSystem/small/pdfFile.png';

export function useFileIcon(type: string, mimeType: string) {
  if (type === 'folder') {
    return folder;
  }

  switch (mimeType) {
    case 'application/zip':
      return compressedFile;
    case 'application/octet-stream':
      return executionFile;
    case 'application/pdf':
      return pdfFile;
    default:
      return docmentFile;
  }
}
