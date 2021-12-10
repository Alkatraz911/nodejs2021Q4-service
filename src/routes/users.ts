import  { FastifySchema,  FastifyReply, FastifyPluginCallback} from 'fastify';
import { CustomRequest } from '../controllers/handlers/users';
import { getUsersSchema, getUserSchema, postUserSchema, editUserSchema, deleteUserSchema } from '../controllers/schemas/users';
import { getUsers, getUser, addUser, editUser, deleteUser } from '../controllers/handlers/users';
import { DefaultRoute } from 'fastify/types/route';




interface CustomRoute {
    schema: FastifySchema;
    handler: DefaultRoute<CustomRequest, FastifyReply>;
}


const getUsersOpts: CustomRoute = {
    schema: getUsersSchema,
    handler: getUsers
}

const getUserOpts: CustomRoute = {
    schema: getUserSchema,
    handler: getUser
}

const postUserOpts: CustomRoute = {
    schema: postUserSchema,
    handler: addUser
}

const editUserOpts: CustomRoute = {
    schema: editUserSchema,
    handler: editUser
}

const deleteUserOpts: CustomRoute = {
    schema: deleteUserSchema,
    handler: deleteUser
}

const usersRoutes:FastifyPluginCallback =  (server, _option, done) => {
    server.get('/users', getUsersOpts);
    server.get('/users/:id', getUserOpts);
    server.post('/users', postUserOpts);
    server.put('/users/:id', editUserOpts);
    server.delete('/users/:id', deleteUserOpts);
    done();
};



export { usersRoutes }













