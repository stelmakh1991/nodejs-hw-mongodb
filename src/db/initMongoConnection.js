import mongoose from 'mongoose';
import { env } from '../utils/env.js';
import { ENV } from '../constants/index.js';

export const initMongoConnection = async () => {
  const connectionLink = `mongodb+srv://${env(ENV.MONGODB_USER)}:${env(
    ENV.MONGODB_PASSWORD,
  )}@${env(ENV.MONGODB_URL)}/${env(
    ENV.MONGODB_DB,
  )}?retryWrites=true&w=majority&appName=Cluster0`;

  try {
    await mongoose.connect(connectionLink);
    console.log('Mongo connection successfully established!');
  } catch (err) {
    console.log(err);
    throw err;
  }
};
