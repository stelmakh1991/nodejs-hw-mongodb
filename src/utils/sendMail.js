import nodemailer from 'nodemailer';
import { env } from './env.js';
import { ENV } from '../constants/index.js';

const transport = nodemailer.createTransport({
  host: env(ENV.SMTP_HOST),
  port: env(ENV.SMTP_PORT),
  auth: {
    pass: env(ENV.SMTP_PASSWORD),
    user: env(ENV.SMTP_USER),
  },
  from: env(ENV.SMTP_USER),
});

export const sendMail = async (options) => {
  return await transport.sendMail(options);
};
