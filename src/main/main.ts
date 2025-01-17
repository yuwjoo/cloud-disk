import { app } from 'electron';
import started from 'electron-squirrel-startup';
import '@/db';
import '@/ipc';
import '@/protocol';
import '@/window';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}
