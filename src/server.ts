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
    server.listen(PORT);
    console.log(`Server started at port ${PORT}`);

    process.on('uncaughtException', (error, origin) => {
        console.error(`${new Date()} captured error: ${error.message} \n`);
        fs.writeFileSync('./src/logs/fatal.json', error.message);
        process.exit(1);
    });

    process.on('unhandledRejection', (reason: Error, promise) => {
        fs.appendFile('./src/logs/rejections.json', `${new Date()} Unhandled rejection detected: ${reason.message} \n`, (err) => {
            if (err)
                console.log(err);
        });
    });

    // setTimeout(() => {
    //     Promise.reject(new Error('Oops!'));
    // }, 1500);

} catch (err) {
    server.log.error(err);
    server.setErrorHandler(customErrorHandler);
}


export { server };
