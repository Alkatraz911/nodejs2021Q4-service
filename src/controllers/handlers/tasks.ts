import { FastifyReply, FastifyRequest } from 'fastify';
import { Itask } from '../../db/data';
import { taskRepository } from '../../resources/tasks/task.repository';

export type CustomRequest = FastifyRequest<{
    Params: {
        id: string;
        boardId: string;
    }

    Body: Itask;
}>

/**
 * Returns  array of created tasks or empty array if no tasks were created
 * @param req - fastify request
 * @param reply - fastify reply
 * @returns array of created tasks or empty array if no tasks were created
 */

const getTasks = async (req: CustomRequest, reply: FastifyReply) => {

    const { boardId } = req.params;
    const result = await taskRepository.getAllTasks(boardId);
    return reply
        .status(200)
        .send(result);
}



/**
 * Returns task with requested id
 * @param req - fastify request
 * @param reply - fastify reply
 * @returns task(object) with requested id or error 404 if task not found
 */

const getTask = async (req: CustomRequest, reply: FastifyReply) => {
    const { boardId, id } = req.params;
    const task = await taskRepository.getTask(boardId, id);
    if (!task) {
        return reply.status(404).send({
            errorMsg: `task with id ${id} not found`,
        });
    }
    return reply
        .status(200)
        .send(task);
};

/**
 * Add created task to the array of boards
 * @param req - fastify request
 * @param reply - fastify reply
 * @returns added task(object)
 */

const addTask = async (req: CustomRequest, reply: FastifyReply) => {
    const { boardId } = req.params;
    const task = await taskRepository.createTask(boardId, req.body);
    if (task) {
        return reply
            .status(201)
            .send(task);
    } 
        return reply
            .status(404)
            .send('Erorr');
}

/**
 * Edit task with requested id
 * @param req - fastify request
 * @param reply - fastify reply
 * @returns edited task(object) or error 404 if task not found
 */

const editTask = async (req: CustomRequest, reply: FastifyReply) => {
    const { boardId, id } = req.params;
    const task = await taskRepository.editTask(boardId, id, req.body);
    if (task) {
        return reply
            .status(200)
            .send(task);
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

const deleteTask = async (req: CustomRequest, reply: FastifyReply) => {
    const { boardId, id } = req.params;
    const task = await taskRepository.getTask(boardId,id);
    if (task) {
        await taskRepository.deleteTask(boardId,id);

        return reply
            .status(204)
            .send()
    }
    return reply
        .status(404)
        .send('Not found');
}


export { getTasks, getTask, addTask, editTask, deleteTask }