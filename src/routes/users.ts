import { getUsersSchema, getUserSchema, postUserSchema, editUserSchema, deleteUserSchema } from '../controllers/schemas/users';
import { getUsers, getUser, addUser, editUser, deleteUser } from '../controllers/handlers/users';




interface IrouteHandler {
    schema: object;
    handler: object;
}

const getUsersOpts: IrouteHandler = {
    schema: getUsersSchema,
    handler: getUsers
}

const getUserOpts: IrouteHandler = {
    schema: getUserSchema,
    handler: getUser
}

const postUserOpts: IrouteHandler = {
    schema: postUserSchema,
    handler: addUser
}

const editUserOpts: IrouteHandler = {
    schema: editUserSchema,
    handler: editUser
}

const deleteUserOpts: IrouteHandler = {
    schema: deleteUserSchema,
    handler: deleteUser
}

const usersRoutes = (server, options, done) => {
    server.get('/users', getUsersOpts);
    server.get('/users/:id', getUserOpts);
    server.post('/users', postUserOpts);
    server.put('/users/:id', editUserOpts);
    server.delete('/users/:id', deleteUserOpts)
    done();
};



export { usersRoutes }













