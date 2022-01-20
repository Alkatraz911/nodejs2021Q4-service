import { FastifyReply, FastifyRequest } from 'fastify';
import { Iuser } from '../../db/data';
import { UserRepository, userRepository } from '../../resources/users/user.repository';
// import { ServerError } from '../../errorHandler';



/**
 * Returns  array of created users or empty array if no users were created
 * @param req - fastify request
 * @param reply - fastify reply
 * @returns array of created users or empty array if no users were created
 */

async function getUsers(_req: FastifyRequest, reply: FastifyReply) {
    const result = await userRepository.getAllUsers();
    // throw new ServerError();
    return reply
        .status(200)
        .send(result);
}



export type CustomRequest = FastifyRequest<{
    Params: {
        id: string;
    }

    Body: Iuser;
}>

/**
 * Returns user with requested id
 * @param req - fastify request
 * @param reply - fastify reply
 * @returns user(object) with requested id or error 404 if user not found
 */

async function getUser(req: CustomRequest, reply: FastifyReply) {
    const { id } = req.params;
    const user = await userRepository.getUser(id)
    if (!user) {
        return reply.status(404).send({
            errorMsg: `User with id ${id} not found`,
        });
    }
    return reply
        .status(200)
        .send(UserRepository.toResponse(user));
};

/**
 * Add created user to the array of users
 * @param req - fastify request
 * @param reply - fastify reply
 * @returns added user(object)
 */

async function addUser(req: CustomRequest, reply: FastifyReply) {
    const user = await userRepository.createUser(req.body);
    if (user) {
        return reply
            .status(201)
            .send(UserRepository.toResponse(user));
    } 
        return reply
        .status(404)
        .send('Erorr');
}

/**
 * Edit user with requested id
 * @param req - fastify request
 * @param reply - fastify reply
 * @returns edited user(object) or error 404 if board not found
 */

async function editUser(req: CustomRequest, reply: FastifyReply) {
    const { id } = req.params;
    const user = await userRepository.updateUser(id, req.body);
    if (user) {
        return reply
            .status(200)
            .send(UserRepository.toResponse(user));
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

async function deleteUser(req: CustomRequest, reply: FastifyReply) {
    const { id } = req.params;
    if (id) {
        await userRepository.deleteUser(id);
        // Need to add unasign method from taskRepo
        return reply
            .status(204)
            .send();
    } 
        return reply
        .status(404)
        .send('Erorr');
}


export { getUsers, getUser, addUser, editUser, deleteUser }