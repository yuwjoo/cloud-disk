import { handle, broadcast } from '@/utils/ipcMain';
import { db } from '@/db';
import { BlogData } from 'common/types/blog';
import { v4 as uuidV4 } from 'uuid';

handle('blog-list', () => {
  return new Promise<BlogData[]>((resolve) => {
    db.find<BlogData>({}).exec((err, docs) => {
      resolve(docs);
    });
  });
});

handle('blog-add', (event, data) => {
  return new Promise((resolve) => {
    db.insert({ ...data, id: uuidV4() }, (err, newDoc) => {
      resolve(newDoc);
      broadcast(event.sender, 'blog-broadcast', [{ operate: 'add', data: newDoc }]);
    });
  });
});

handle('blog-update', (event, data) => {
  return new Promise((resolve) => {
    db.update({ id: data.id }, { $set: data }, {}, () => {
      resolve();
      broadcast(event.sender, 'blog-broadcast', [{ operate: 'update', data }]);
    });
  });
});

handle('blog-delete', (event, data) => {
  return new Promise((resolve) => {
    db.remove({ id: data.id }, {}, () => {
      resolve();
      broadcast(event.sender, 'blog-broadcast', [{ operate: 'delete', data }]);
    });
  });
});
