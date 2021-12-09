
import { FastifyReply, FastifyRequest } from 'fastify';
import { data, Iuser } from '../../db/data';
import { User } from '../../resources/users/user.model';

const { users, tasks} = data;

function getUsers(req:FastifyRequest, reply:FastifyReply) {
    const result = users.map(el => User.toResponse(el));
    return reply
    .status(200)
    .send(result);
}

type CustomRequest = FastifyRequest<{
    Params?:{
        id: string;
    }

    Body?: Iuser;
}>



function getUser (req:CustomRequest, reply:FastifyReply) {
    const { id } = req.params;
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



function addUser (req:CustomRequest, reply:FastifyReply) {
    const user = new User(req.body);
    users.push(user);
    return reply
    .status(201)
    .send(User.toResponse(user));
}

function editUser (req:CustomRequest, reply:FastifyReply) {
    const { id } = req.params;
    const user = users.find((el) => el.id === id);
    const keys = Object.keys(req.body);
    for (let i = 0; i < keys.length; i += 1) {
        user[keys[i]] = req.body[keys[i]]
    }
    return reply
    .status(200)
    .send(User.toResponse(user));
}

function deleteUser(req:CustomRequest, reply:FastifyReply) {
    const { id } = req.params;
    const index:number = users.findIndex(el => el.id === id);
    const result = users.splice(index, index + 1);
    
    tasks.forEach(el => {
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