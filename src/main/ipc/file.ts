import { app } from 'electron';
import { handle } from '@/utils/ipcMain';
import fs from 'fs';
import path from 'path';

handle('read-file', (_event, filePath) => {
  try {
    return fs.readFileSync(path.join(app.getPath('userData'), filePath), 'utf-8');
  } catch {
    return '';
  }
});

handle('write-file', (_event, filePath, content) => {
  const fullPath = path.join(app.getPath('userData'), filePath);
  const dirPath = path.dirname(fullPath);

  // 确保目录存在
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // 写入文件
  fs.writeFileSync(fullPath, content);
});

handle('delete-file', (_event, filePath) => {
  fs.unlinkSync(path.join(app.getPath('userData'), filePath));
});

handle('move-file', (_event, filePath, newFilePath) => {
  fs.renameSync(
    path.join(app.getPath('userData'), filePath),
    path.join(app.getPath('userData'), newFilePath)
  );
});
