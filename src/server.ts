import fastify from 'fastify';
import { config } from './common/config';
import { usersRoutes } from './routes/users';
import { boardsRoutes } from './routes/boards';
import { tasksRoutes } from './routes/tasks';


const server = fastify({ logger: true });
server.register(usersRoutes);
server.register(boardsRoutes);
server.register(tasksRoutes);



try {
    server.listen(config.PORT);

} catch (err) {
    server.log.error(err)
}
export { server };
