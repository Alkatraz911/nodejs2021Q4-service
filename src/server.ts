import "reflect-metadata";
import fastify, { FastifyInstance } from 'fastify';
import fs from 'fs';
import { connectDB } from './loaders/postgresLoader';
import { config } from './common/config';
import { logger } from './logger';





const { PORT } = config;


const server: FastifyInstance = fastify({
    logger
});

const initDB = async () => {
    await connectDB();
}

try {
    initDB().then(async () => {
        const { authRoute } = (await import('./routes/auth'));
        const { usersRoutes } = (await import('./routes/users'));
        const { boardsRoutes } = (await import('./routes/boards'));
        const { tasksRoutes } = (await import('./routes/tasks'));
        const { userRepository } = (await import('./resources/users/user.repository'));
        const admin = (await userRepository.getAllUsers()).find(user => user.login === 'admin')
        if (!admin) {
            await userRepository.createUser({ name: "admin", password: "admin", login: "admin" });
        }


        server.register(authRoute);
        server.register(usersRoutes);
        server.register(boardsRoutes);
        server.register(tasksRoutes);




        server.addHook('preHandler', (req, _reply, done) => {
            if (req.body) {
                req.log.info({ body: req.body }, 'parsed body')
            }
            done()
        });

        // server.setErrorHandler(customErrorHandler);

        server.listen(PORT, '0.0.0.0');

        console.log(`Server started at port ${PORT}`);
        console.log(`Log level : ${config.LOG_LEVEL}`);

        process.on('uncaughtException', (error) => {
            fs.appendFileSync('./src/logs/error.json', `${new Date()} captured error: ${error.message} \n`);
            console.log(`${new Date()} captured error: ${error.message} \n`);
            process.exit(1);
        });

        process.on('unhandledRejection', (reason: Error) => {

            fs.appendFile('./src/logs/error.json', `${new Date()} Unhandled rejection detected: ${reason.message} \n`, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            console.log(`${new Date()} Unhandled rejection detected: ${reason.message} \n`);
        });
    })
} catch (error) {
    server.log.error(error);
}


export { server }




