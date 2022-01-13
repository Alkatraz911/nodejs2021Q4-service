import { createConnection, Connection } from "typeorm";
import ormConfig from "../common/ormconfig";

export const connectDB = async (): Promise<Connection> => {
    const connection = await createConnection(ormConfig);
    console.log('DB connected!');
    return connection;
}

