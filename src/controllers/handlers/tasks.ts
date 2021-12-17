import { FastifyReply, FastifyRequest } from 'fastify';
import { data, Itask } from '../../db/data';
import { Task }  from '../../resources/tasks/task.model';

let  { tasks } = data;

/**
 * Returns  array of created tasks or empty array if no tasks were created
 * @param req - fastify request
 * @param reply - fastify reply
 * @returns array of created tasks or empty array if no tasks were created
 */

const getTasks =  (req:CustomRequest, reply:FastifyReply) => {
    let { boardId } = req.params;
    const result = tasks.filter(el => el.boardId === boardId);
    return reply
    .status(200)
    .send(result);
}

export type CustomRequest = FastifyRequest<{
    Params:{
        id: string;
        boardId: string;
    }

    Body: Itask;
}>

/**
 * Returns task with requested id
 * @param req - fastify request
 * @param reply - fastify reply
 * @returns task(object) with requested id or error 404 if task not found
 */

const getTask = (req:CustomRequest, reply:FastifyReply) => {
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

/**
 * Add created task to the array of boards
 * @param req - fastify request
 * @param reply - fastify reply
 * @returns added task(object)
 */

const addTask = (req:CustomRequest, reply:FastifyReply) => {
    const task = new Task(req.body);
    const { boardId }  = req.params;
    task.boardId = boardId;
    tasks.push(task);
    return reply
    .status(201)
    .send(Task.toResponse(task));
}

/**
 * Edit task with requested id
 * @param req - fastify request
 * @param reply - fastify reply
 * @returns edited task(object) or error 404 if task not found
 */

const editTask = (req:CustomRequest, reply:FastifyReply) => {
    const { id } = req.params;
    const task = tasks.find((el) => el.id === id);
    if (task) {
        task.title = req.body.title;
        task.order = req.body.order;
        task.description = req.body.description;
        return reply
        .status(200)
        .send(Task.toResponse(task));
    }
    return reply
    .status(404)
    .send('Not found');
}

/**
 * Delete task with requested id 
 * @param req - fastify request
 * @param reply - fastify reply
 * @returns status code 204 or error 404 if task with requested id not found
 */

const deleteTask = (req:CustomRequest, reply:FastifyReply) => {
    const { id } = req.params;
    const index = tasks.findIndex(el => el.id === id);
    tasks.splice(index, index + 1);
    reply.status(204);
    return reply.send()
    
}


export  { getTasks, getTask, addTask, editTask, deleteTask }