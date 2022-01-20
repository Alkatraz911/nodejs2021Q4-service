import { DefaultRoute } from 'fastify/types/route.d';
import  { FastifySchema,  FastifyReply, FastifyPluginCallback} from 'fastify';
import { getTasksSchema, getTaskSchema, postTaskSchema, editTaskSchema, deleteTaskSchema } from '../controllers/schemas/tasks';
import { getTasks, getTask, addTask, editTask, deleteTask , CustomRequest } from '../controllers/handlers/tasks';
import { validateJwt } from '../services/jwt'


interface CustomRoute {
    schema: FastifySchema;
    handler: DefaultRoute<CustomRequest, FastifyReply>;
    preValidation: DefaultRoute<CustomRequest, FastifyReply>;
}

const getTasksOpts:CustomRoute = {
    schema: getTasksSchema,
    handler: getTasks,
    preValidation: validateJwt,
}

const getTaskOpts:CustomRoute = {
    schema: getTaskSchema,
    handler: getTask,
    preValidation: validateJwt,
}

const postTaskOpts:CustomRoute = {
    schema: postTaskSchema,
    handler: addTask,
    preValidation: validateJwt,

}

const editTaskOpts:CustomRoute = {
    schema: editTaskSchema,
    handler: editTask,
    preValidation: validateJwt,

}

const deleteTaskOpts:CustomRoute = {
    schema: deleteTaskSchema,
    handler: deleteTask,
    preValidation: validateJwt,

}

const tasksRoutes:FastifyPluginCallback = (server, _option, done) => {
    server.get('/boards/:boardId/tasks', getTasksOpts);
    server.get('/boards/:boardId/tasks/:id', getTaskOpts);
    server.post('/boards/:boardId/tasks', postTaskOpts);
    server.put('/boards/:boardId/tasks/:id', editTaskOpts);
    server.delete('/boards/:boardId/tasks/:id', deleteTaskOpts);
    done();
};


export { tasksRoutes }