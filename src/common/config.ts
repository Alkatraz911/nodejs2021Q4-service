import * as dotenv from "dotenv";
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

interface Iconfig {
  PORT: string;
  JWT_SECRET_KEY: string;
  AUTH_MODE: boolean;
  LOG_LEVEL: string;
  POSTGRES_PORT: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
}

const config :Iconfig = {
  PORT: process.env.PORT ? process.env.PORT : '4000',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY ? process.env.JWT_SECRET_KEY : '' ,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  LOG_LEVEL: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info',
  POSTGRES_PORT: process.env.POSTGRES_PORT ? process.env.POSTGRES_PORT : '4001',
  POSTGRES_USER: process.env.POSTGRES_USER ? process.env.POSTGRES_USER : 'user',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD ? process.env.POSTGRES_PASSWORD : '123',
  POSTGRES_DB: process.env.POSTGRES_DB ? process.env.POSTGRES_DB : '',
};

export { config }