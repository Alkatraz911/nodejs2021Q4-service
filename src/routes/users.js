const { getUsersSchema } = require('../controllers/schemas/users');
const { getUsers } = require('../controllers/handlers/users');
const { getUserSchema } = require('../controllers/schemas/users');
const { getUser } = require('../controllers/handlers/users');
const { postUserSchema } = require('../controllers/schemas/users');
const { addUser } = require('../controllers/handlers/users');
const { editUserSchema } = require('../controllers/schemas/users');
const { editUser } = require('../controllers/handlers/users');
const { deleteUserSchema } = require('../controllers/schemas/users');
const { deleteUser } = require('../controllers/handlers/users');

const getUsersOpts = {
    schema: getUsersSchema,
    handler: getUsers
}

const getUserOpts = {
    schema: getUserSchema,
    handler: getUser
}

const postUserOpts = {
    schema: postUserSchema,
    handler: addUser
}

const editUserOpts = {
    schema: editUserSchema,
    handler: editUser
}

const deleteUserOpts = {
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



module.exports = usersRoutes













