import { ConnectionOptions } from 'typeorm';
import { config } from './config';
import { User } from '../resources/users/user.model'
import { Board } from '../resources/boards/board.model';
import { Task } from '../resources/tasks/task.model';


const ormConfig: ConnectionOptions = {
    type: 'postgres',
    host: config.POSTGRES_HOST,
    port: Number(config.POSTGRES_CONTAINERPORT),
    username: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
    database: config.POSTGRES_DB,
    logging: false,
    entities: [
        User,
        Board,
        Task
    ],
    synchronize: false,
    dropSchema: false,
    migrations: ['src/migrations/*.ts'],
    migrationsRun: false,
    cli: {
      migrationsDir: 'src/migrations'
    }
}

export default ormConfig 