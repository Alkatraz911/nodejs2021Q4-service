
const { users, tasks } = require('../../db/data');
const User = require('../../resources/users/user.model');

const getUsers = async (req, reply) => {
    reply.header('Content-Type', 'application/json');
    const result = users.map(el => User.toResponse(el));
    return reply
    .status(200)
    .send(result);
}

const getUser = (req, reply) => {
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

const addUser = (req, reply) => {
    const user = new User(req.body);
    users.push(user);
    return reply
    .status(201)
    .send(User.toResponse(user));
}

const editUser = (req, reply) => {
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

const deleteUser = (req, reply) => {
    const { id } = req.params;
    const index = users.findIndex(el => el.id === id);
    const result = users.splice(index, index + 1);
    
    tasks.forEach(el => {
        const element = el
        if (element.userId === id) {
            element.userId = null;
        } 
    });
    return reply
    .status(200)
    .send(User.toResponse(result));
}


module.exports =  { getUsers, getUser, addUser, editUser, deleteUser }