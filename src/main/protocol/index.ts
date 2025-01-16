import { app, protocol, net } from 'electron';
import path from 'path';
import { pathToFileURL } from 'url';
import fs from 'fs/promises';
import { RENDERER_PATH } from '@/utils/constant';

protocol.registerSchemesAsPrivileged([
  { scheme: 'renderer', privileges: { secure: true, standard: true } }
]);

app.once('ready', () => {
  protocol.handle('renderer', async (req) => {
    try {
      const { host, pathname } = new URL(req.url);
      const filePath = path.join(RENDERER_PATH, host, pathname);

      try {
        await fs.access(filePath);
        return net.fetch(pathToFileURL(filePath).toString());
      } catch {
        return net.fetch(pathToFileURL(path.join(RENDERER_PATH, host, '/index.html')).toString());
      }
    } catch {
      return new Response(null, { status: 500 });
    }
  });
});
