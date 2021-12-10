import { FastifyReply, FastifyRequest } from 'fastify';
import { data, Itask } from '../../db/data';
import { Task }  from '../../resources/tasks/task.model';

const tasks = data.tasks;

const getTasks =  (req:FastifyRequest, reply:FastifyReply) => {
    reply.header('Content-Type', 'application/json');
    const result = tasks.map(el => Task.toResponse(el));
    return reply
    .status(200)
    .send(result);
}

export type CustomRequest = FastifyRequest<{
    Params:{
        id: string|undefined;
        boardId: string|undefined;
    }

    Body: Itask;
}>


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


const addTask = (req:CustomRequest, reply:FastifyReply) => {
    const task = new Task(req.body,req.params);
    tasks.push(task);
    return reply
    .status(201)
    .send(Task.toResponse(task));
}

const editTask = (req:CustomRequest, reply:FastifyReply) => {
    const { id } = req.params;
    const task = tasks.find((el) => el.id === id);
    if(task) {
        task.title = req.body.title;
        task.order = req.body.order;
        task.description = req.body.description;
        return reply
        .status(200)
        .send(Task.toResponse(task));
    }

}

const deleteTask = (req:CustomRequest, reply:FastifyReply) => {
    const { id } = req.params;
    const index = tasks.findIndex(el => el.id === id);
    const result = tasks.splice(index, index + 1);
    return reply
    .status(200)
    .send(result.forEach((el)=>Task.toResponse(el)));
}


export  { getTasks, getTask, addTask, editTask, deleteTask }