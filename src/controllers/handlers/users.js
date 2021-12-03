/* eslint-disable */
const { users } = require('../../resources/data');
const User = require('../../resources/users/user.model');

const getUsers = async (req, reply) => {
    reply.header('Content-Type', 'application/json');
    let result = users.map(el => User.toResponse(el));
    return reply
    .status(200)
    .send(result);
}

const getUser = (req, reply) => {
    const { id } = req.params;
    let user = users.find((el) => el.id === id);
    if (!user) {
        return reply.status(404).send({
            errorMsg: `User with id ${id} not found`,
        });
    }
    return reply
    .status(200)
    .send(User.toResponse(user));
};

const addUser = (req, reply) => {
    let user = new User(req.body);
    users.push(user);
    return reply
    .status(201)
    .send(User.toResponse(user));
}

const editUser = (req, reply) => {
    const { id } = req.params;
    let user = users.find((el) => el.id === id);
    const keys = Object.keys(req.body);
    for (const el of keys) {
        user[el] = req.body[el]
    }
    return reply
    .status(200)
    .send(User.toResponse(user));
}

const deleteUser = (req, reply) => {
    const { id } = req.params;
    const index = users.findIndex(el => el.id === id);
    const result = users.splice(index, index + 1);
    return reply
    .status(200)
    .send(User.toResponse(result));
}


module.exports =  { getUsers, getUser, addUser, editUser, deleteUser }