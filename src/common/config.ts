import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

interface Iconfig {
  PORT: string;
  NODE_ENV: string;
  MONGO_CONNECTION_STRING: string;
  JWT_SECRET_KEY: string;
  AUTH_MODE: boolean
}

const config :Iconfig = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true'
};

export { config }