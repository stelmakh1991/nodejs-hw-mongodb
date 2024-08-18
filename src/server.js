import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import { ENV } from './constants/index.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import contactsRouter from './routers/contacts.js';

export const setupServer = () => {
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());

  app.use(
    express.json({
      limit: '1mb',
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );

  app.use(contactsRouter);

  app.use(notFoundMiddleware);

  app.use(errorHandlerMiddleware);

  const PORT = env(ENV.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
};
