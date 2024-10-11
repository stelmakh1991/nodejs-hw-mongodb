import path from 'node:path';

export const ENV = {
    PORT: 'PORT',
    MONGODB_USER: 'MONGODB_USER',
    MONGODB_PASSWORD: 'MONGODB_PASSWORD',
    MONGODB_URL: 'MONGODB_URL',
    MONGODB_DB: 'MONGODB_DB',
    JWT_SECRET: 'JWT_SECRET',
    BASIC_HOST: 'BASIC_HOST',
    SMTP_HOST: 'SMTP_HOST',
    SMTP_PORT: 'SMTP_PORT',
    SMTP_USER: 'SMTP_USER',
    SMTP_PASSWORD: 'SMTP_PASSWORD',
    SMTP_FROM: 'SMTP_FROM',
    CLOUDINARY_NAME: 'CLOUDINARY_NAME',
    CLOUDINARY_API_KEY: 'CLOUDINARY_API_KEY',
    CLOUDINARY_API_SECRET: 'CLOUDINARY_API_SECRET',
    IS_CLOUDINARY_ENABLED: 'IS_CLOUDINARY_ENABLED',
  };

export const PER_PAGE_LIMIT = 100;
export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 10;
export const DEFAULT_SORT_BY = '_id';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const ROLES = {
  AUTOR: 'userID',
};

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
