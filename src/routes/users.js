/* eslint-disable */
const User = require('../resources/users/user.model');
const {users} = require('../resources/data');

const getAll = async (req,reply) => {
    reply.statusCode = 200
    reply.header('Content-Type','application/json');
    return JSON.stringify(users);
}

const getUserById = async (req) => {
    let id = req.url.slice('users/'.length, req.url.length);
    return users.find((el) => el.id === id);
}

const createUser = async (req) => {
    users.push(req.body)
    return req.body;
}

module.exports = {
    get:getAll,
    post:createUser,
}

