import { ConnectionOptions } from 'typeorm';
import { User } from '../users/user.model';
import { Board } from '../boards/board.model';
import { Task } from '../tasks/task.model';
import config from './config';
import * as path from 'path';

const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: config.POSTGRES_HOST,
  port: Number(config.POSTGRES_PORT),
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
  entities: [User, Board, Task],
  synchronize: false,
  dropSchema: false,
  migrations: [path.join(__dirname, '/../../migrations') + '/*.ts'],
  cli: {
    migrationsDir: path.join(__dirname, '/../../migrations'),
  },
};

export default ormConfig;
