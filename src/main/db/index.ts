import { app } from 'electron';
import NeDb from 'nedb';
import path from 'path';

export const db = new NeDb({
  filename: path.join(app.getPath('userData'), 'base.db'),
  autoload: true
});
