import fs from 'node:fs/promises';
import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.js';
import { ENV } from '../constants/index.js';

cloudinary.config({
  cloud_name: env(ENV.CLOUDINARY_NAME),
  api_key: env(ENV.CLOUDINARY_API_KEY),
  api_secret: env(ENV.CLOUDINARY_API_SECRET),
});

export const saveToCloudinary = async (file, folder) => {
  const res = await cloudinary.uploader.upload(file.path, {
    folder,
  });
  await fs.unlink(file.path);

  return res.secure_url;
};
