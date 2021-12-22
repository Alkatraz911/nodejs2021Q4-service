import fastify, { FastifyInstance } from 'fastify';
import { config } from './common/config';
import { usersRoutes } from './routes/users';
import { boardsRoutes } from './routes/boards';
import { tasksRoutes } from './routes/tasks';
import fs from 'fs';

const { PORT } = config;


const server: FastifyInstance = fastify({
    logger: {
        // prettyPrint: {
        //     translateTime: 'SYS:standard yyyy-mm-dd HH:MM:ss.l o',
        //     ignore: 'pid,level',
        // },
        file: './src/logs/logs.json',
        serializers: {
            res(reply) {
                return {
                    statusCode: reply.statusCode,
                }
            },
            req(request) {
                return {
                    method: request.method,
                    url: request.url,
                    path: request.routerPath,
                    parameters: request.params,
                    query: request.query,
                };
            }
        }
    }
});

server.addHook('preHandler', function (req, reply, done) {
    if (req.body) {
      req.log.info({ body: req.body }, 'parsed body')
    }
    done()
})

server.register(usersRoutes);
server.register(boardsRoutes);
server.register(tasksRoutes);




try {
    server.listen(PORT);
    console.log(`Server started at port ${PORT}`)

} catch (err) {
    server.log.error(err);
}

export { server };
