import fastify, { FastifyInstance } from 'fastify';
import fs from 'fs';
import { config } from './common/config';
import { usersRoutes } from './routes/users';
import { boardsRoutes } from './routes/boards';
import { tasksRoutes } from './routes/tasks';
import { logger } from './logger';
import { customErrorHandler } from './errorHandler';


const { PORT } = config;

const server: FastifyInstance = fastify({
    logger
});

try {

    server.register(usersRoutes);
    server.register(boardsRoutes);
    server.register(tasksRoutes);

    server.addHook('preHandler', (req, reply, done) => {
        if (req.body) {
            req.log.info({ body: req.body }, 'parsed body')
        }
        done()
    });
    
    server.setErrorHandler(customErrorHandler);

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

//     setTimeout(()=>{
//         throw new Error('Oops!');
//     },1000) 

//     setTimeout(()=>{
//         Promise.reject(Error('Oops!'));
//    },1000) 


} catch (err) {
    server.log.error(err);
}


export { server };
