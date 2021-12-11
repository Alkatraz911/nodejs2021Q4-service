import fastify, { FastifyInstance } from 'fastify';
import { config } from './common/config';
const { PORT } = config;
import { usersRoutes } from './routes/users';
import { boardsRoutes } from './routes/boards';
import { tasksRoutes } from './routes/tasks';


const server:FastifyInstance = fastify({ logger: true });
server.register(usersRoutes);
server.register(boardsRoutes);
server.register(tasksRoutes);




try {
    server.listen(PORT);
    console.log(`server started at port ${PORT}`);
} catch (err) {
    server.log.error(err)
}
export { server };
