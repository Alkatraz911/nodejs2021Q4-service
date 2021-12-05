const { tasks } = require('../../db/data');
const Task = require('../../resources/tasks/task.model');

const getTasks =  (req, reply) => {
    reply.header('Content-Type', 'application/json');
    const result = tasks.map(el => Task.toResponse(el));
    return reply
    .status(200)
    .send(result);
}

const getTask = (req, reply) => {
    const { id } = req.params;
    const task = tasks.find((el) => el.id === id);
    if (!task) {
        return reply.status(404).send({
            errorMsg: `task with id ${id} not found`,
        });
    }
    return reply
    .status(200)
    .send(Task.toResponse(task));
};

const addTask = (req, reply) => {
    const task = new Task(req.body,req.params);
    tasks.push(task);
    return reply
    .status(201)
    .send(Task.toResponse(task));
}

const editTask = (req, reply) => {
    const { id } = req.params;
    const task = tasks.find((el) => el.id === id);
    const keys = Object.keys(req.body);
    for (let i = 0; i < keys.length; i += 1) {
        task[keys[i]] = req.body[keys[i]]
    }
    return reply
    .status(200)
    .send(Task.toResponse(task));
}

const deleteTask = (req, reply) => {
    const { id } = req.params;
    const index = tasks.findIndex(el => el.id === id);
    const result = tasks.splice(index, index + 1);
    return reply
    .status(200)
    .send(Task.toResponse(result));
}


module.exports =  { getTasks, getTask, addTask, editTask, deleteTask }