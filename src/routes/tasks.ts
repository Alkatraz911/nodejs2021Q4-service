const { getTasksSchema } = require('../controllers/schemas/tasks');
const { getTasks } = require('../controllers/handlers/tasks');
const { getTaskSchema } = require('../controllers/schemas/tasks');
const { getTask } = require('../controllers/handlers/tasks');
const { postTaskSchema } = require('../controllers/schemas/tasks');
const { addTask } = require('../controllers/handlers/tasks');
const { editTaskSchema } = require('../controllers/schemas/tasks');
const { editTask } = require('../controllers/handlers/tasks');
const { deleteTaskSchema } = require('../controllers/schemas/tasks');
const { deleteTask } = require('../controllers/handlers/tasks');

const getTasksOpts = {
    schema: getTasksSchema,
    handler: getTasks
}

const getTaskOpts = {
    schema: getTaskSchema,
    handler: getTask
}

const postTaskOpts = {
    schema: postTaskSchema,
    handler: addTask
}

const editTaskOpts = {
    schema: editTaskSchema,
    handler: editTask
}

const deleteTaskOpts = {
    schema: deleteTaskSchema,
    handler: deleteTask
}

const tasksRoutes = (server, options, done) => {
    server.get('/boards/:boardId/tasks', getTasksOpts);
    server.get('/boards/:boardId/tasks/:id', getTaskOpts);
    server.post('/boards/:boardId/tasks', postTaskOpts);
    server.put('/boards/:boardId/tasks/:id', editTaskOpts);
    server.delete('/boards/:boardId/tasks/:id', deleteTaskOpts);
    done();
};


export { tasksRoutes }