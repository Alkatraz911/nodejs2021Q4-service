import fastify, { FastifyInstance } from 'fastify';
import { config } from './common/config';
import { usersRoutes } from './routes/users';
import { boardsRoutes } from './routes/boards';
import { tasksRoutes } from './routes/tasks';
import { logger } from './logger';
import { customErrorHandler } from './errorHandler';
import fs from 'fs';


const { PORT } = config;

const server: FastifyInstance = fastify({
    logger: logger
});

try {

    server.register(usersRoutes);
    server.register(boardsRoutes);
    server.register(tasksRoutes);

    server.addHook('preHandler', function (req, reply, done) {
        if (req.body) {
            req.log.info({ body: req.body }, 'parsed body')
        }
        done()
    });
    
    server.setErrorHandler(customErrorHandler);

    server.listen(PORT);
    console.log(`Server started at port ${PORT}`);
    console.log(`Log level : ${config.LOG_LEVEL}`);

    process.on('uncaughtException', (error, origin) => {
        fs.appendFileSync('./src/logs/error.json', `${new Date()} captured error: ${error.message} \n`);
        process.exit(1);
    });

    process.on('unhandledRejection', (reason: Error, promise) => {
        fs.appendFile('./src/logs/error.json', `${new Date()} Unhandled rejection detected: ${reason.message} \n`, (err) => {
            if (err)
                console.log(err);
        });
    });


} catch (err) {
    server.log.error(err);
}


export { server };
