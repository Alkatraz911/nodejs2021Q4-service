import { config } from './config';
import { User } from '../resources/users/user.model'
import { Board } from '../resources/boards/board.model';
import { Task } from '../resources/tasks/task.model';
import { ConnectionOptions } from 'typeorm';


const ormConfig: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: Number(config.POSTGRES_PORT),
    username: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
    database: config.POSTGRES_DB,
    entities: [
        User,
        Board,
        Task
    ],
    synchronize: true,
    logging: false,
    dropSchema: false,
    migrations: ['./src/migrations/**/*.ts'],
    migrationsRun: false,
    cli: {
      migrationsDir: 'src/migrations'
    }  
}

export default ormConfig 