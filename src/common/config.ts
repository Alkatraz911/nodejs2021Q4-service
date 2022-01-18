import * as dotenv from "dotenv";
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

interface Iconfig {
  PORT: string;
  AUTH_MODE: boolean;
  LOG_LEVEL: string;
  POSTGRES_PORT: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  POSTGRES_HOST: string;
  POSTGRES_CONTAINERPORT:string;
  JWT_SECRET:string;
}

const config :Iconfig = {
  PORT: process.env.PORT ? process.env.PORT : '4000',
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  LOG_LEVEL: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info',
  POSTGRES_PORT: process.env.POSTGRES_PORT ? process.env.POSTGRES_PORT : '4001',
  POSTGRES_USER: process.env.POSTGRES_USER ? process.env.POSTGRES_USER : 'user',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD ? process.env.POSTGRES_PASSWORD : '123',
  POSTGRES_DB: process.env.POSTGRES_DB ? process.env.POSTGRES_DB : '',
  POSTGRES_HOST: process.env.POSTGRES_HOST ? process.env.POSTGRES_HOST : 'postrgres',
  POSTGRES_CONTAINERPORT: process.env.POSTGRES_CONTAINERPORT ? process.env.POSTGRES_CONTAINERPORT : '5432',
  JWT_SECRET: process.env.JWT_SECRET ? process.env.JWT_SECRET : 'default_salt'
};

export { config }