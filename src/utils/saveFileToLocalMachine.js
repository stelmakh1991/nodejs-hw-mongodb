import fs from 'node:fs/promises';
import path from 'node:path';
import { ENV, UPLOAD_DIR, TEMP_UPLOAD_DIR } from '../constants/index.js';

export const saveFileToLocalMachine = async (file) => {
  const oldPath = path.join(TEMP_UPLOAD_DIR, file.filename);
  const newPath = path.join(UPLOAD_DIR, file.filename);
  await fs.rename(oldPath, newPath);

  return ENV.APP_DOMAIN + `/uploads/${file.filename}`;
};
