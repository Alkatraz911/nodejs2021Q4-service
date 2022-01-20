import  { FastifySchema,  FastifyReply, FastifyPluginCallback} from 'fastify';
import { DefaultRoute } from 'fastify/types/route.d';
import { CustomRequest , getUsers, getUser, addUser, editUser, deleteUser } from '../controllers/handlers/users';
import { getUsersSchema, getUserSchema, postUserSchema, editUserSchema, deleteUserSchema } from '../controllers/schemas/users';
import { validateJwt } from '../services/jwt'





interface CustomRoute {
    schema: FastifySchema;
    handler: DefaultRoute<CustomRequest, FastifyReply>;
    preValidation: DefaultRoute<CustomRequest, FastifyReply>;
}


const getUsersOpts: CustomRoute = {
    schema: getUsersSchema,
    handler: getUsers,
    preValidation:validateJwt,
}


const getUserOpts: CustomRoute = {
    schema: getUserSchema,
    handler: getUser,
    preValidation:validateJwt,
}

const postUserOpts: CustomRoute = {
    schema: postUserSchema,
    handler: addUser,
    preValidation:validateJwt,
}

const editUserOpts: CustomRoute = {
    schema: editUserSchema,
    handler: editUser,
    preValidation:validateJwt,
}

const deleteUserOpts: CustomRoute = {
    schema: deleteUserSchema,
    handler: deleteUser,
    preValidation:validateJwt,

}

const usersRoutes:FastifyPluginCallback =  (server, _option, done) => {
    server.get('/users',  getUsersOpts);
    server.get('/users/:id', getUserOpts);
    server.post('/users', postUserOpts);
    server.put('/users/:id', editUserOpts);
    server.delete('/users/:id', deleteUserOpts);
    done();
};



export { usersRoutes }