
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { Iboard } from '../../db/data';
import { boardRepository } from '../../resources/boards/board.repository';




/**
 * Returns  array of created boards or empty array if no boards were created
 * @param req - fastify request
 * @param reply - fastify reply
 * @returns array of created boards or empty array if no boards were created
 */

const getBoards = async (_req: FastifyRequest, reply: FastifyReply) => {
    const result = await boardRepository.getAllBoards();
    return reply
        .status(200)
        .send(result);
}



export type CustomRequest = FastifyRequest<{
    Params: {
        id: string;
    }

    Body: Iboard;
}>

/**
 * Returns board with requested id
 * @param req - fastify request
 * @param reply - fastify reply
 * @returns board(object) with requested id or error 404 if board not found
 */

const getBoard = async (req: CustomRequest, reply: FastifyReply) => {
    const { id } = req.params;
    const board = await boardRepository.getBoard(id);
    if (!board) {
        return reply.status(404).send({
            errorMsg: `board with id ${id} not found`,
        });
    } 
        return reply
            .status(200)
            .send(board);
    



};

/**
 * Add created board to the array of boards
 * @param req - fastify request
 * @param reply - fastify reply
 * @returns added board(object)
 */

const addBoard = async (req: CustomRequest, reply: FastifyReply) => {
    const board = await boardRepository.createBoard(req.body);
    if (board) {
        return reply
            .status(201)
            .send(board);
    }
    return reply
        .status(404)
        .send('Erorr');
}

/**
 * Edit board with requested id
 * @param req - fastify request
 * @param reply - fastify reply
 * @returns edited board(object) or error 404 if board not found
 */

const editBoard = async (req: CustomRequest, reply: FastifyReply) => {
    const { id } = req.params;
    const board = await boardRepository.updateBoard(id, req.body);

    if (board) {
        return reply
            .status(200)
            .send(board);
    }
    return reply
        .status(404)
        .send('Not found');


}

/**
 * Delete board with requested id and its tasks
 * @param req - fastify request
 * @param reply - fastify reply
 * @returns status code 204 or error 404 if board with requested id not found
 */

const deleteBoard = async (req: CustomRequest, reply: FastifyReply) => {
    const { id } = req.params;

    if (id) {
        await boardRepository.deleteBoard(id);
        // Need to add deleting tasks method from taskRepo
        return reply
            .status(204)
            .send();
    } 
        return reply
            .status(404)
            .send('Erorr');
    



}


export { getBoards, getBoard, addBoard, editBoard, deleteBoard }