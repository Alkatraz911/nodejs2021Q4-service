
import { FastifyReply, FastifyRequest } from 'fastify';
import { data, Iuser } from '../../db/data';
import { User } from '../../resources/users/user.model';
import { ValidationError } from '../../errorHandler'

const { users } = data;

/**
 * Returns  array of created users or empty array if no users were created
 * @param req - fastify request
 * @param reply - fastify reply
 * @returns array of created users or empty array if no users were created
 */

function getUsers(req:FastifyRequest, reply:FastifyReply) {
    const result = users.map(el => User.toResponse(el));

    // throw new ValidationError();

    return reply
    .status(200)
    .send(result);
}



export type CustomRequest = FastifyRequest<{
    Params:{
        id: string|undefined;
    }

    Body: Iuser;
}>

/**
 * Returns user with requested id
 * @param req - fastify request
 * @param reply - fastify reply
 * @returns user(object) with requested id or error 404 if user not found
 */

function getUser (req:CustomRequest, reply:FastifyReply) {
    const  { id }  = req.params;
    const user = users.find((el) => el.id === id);
    if (!user) {
        return reply.status(404).send({
            errorMsg: `User with id ${id} not found`,
        });
    }
    return reply
    .status(200)
    .send(User.toResponse(user));
};

/**
 * Add created user to the array of users
 * @param req - fastify request
 * @param reply - fastify reply
 * @returns added user(object)
 */

function addUser (req:CustomRequest, reply:FastifyReply) {
    const user = new User(req.body);
    users.push(user);
    return reply
    .status(201)
    .send(User.toResponse(user));
}

/**
 * Edit user with requested id
 * @param req - fastify request
 * @param reply - fastify reply
 * @returns edited user(object) or error 404 if board not found
 */

function editUser (req:CustomRequest, reply:FastifyReply) {
    const { id } = req.params;
    const user = users.find((el) => el.id === id);
    if(user) {
        user.login = req.body.login;
        user.password = req.body.password;
        user.name = req.body.name;
        return reply
        .status(200)
        .send(User.toResponse(user));
    }
    return reply
    .status(404)
    .send('Not found');
}

/**
 * Delete user with requested id and put null at userId field at tasks created by deleted user
 * @param req - fastify request
 * @param reply - fastify reply
 * @returns status code 204 or error 404 if user with requested id not found
 */

function deleteUser(req:CustomRequest, reply:FastifyReply) {
    const { id } = req.params;
    const index:number = users.findIndex(el => el.id === id);
    const result = users.splice(index, index + 1);
    
    data.tasks.forEach(el => {
        const element = el
        if (element.userId === id) {
            element.userId = null;
        } 
    });
    return reply
    .status(200)
    .send(result.forEach(el => User.toResponse(el)));
}


export  { getUsers, getUser, addUser, editUser, deleteUser }