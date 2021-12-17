
import { FastifyReply, FastifyRequest } from 'fastify';
import { data, Iboard } from'../../db/data';
import { Board } from '../../resources/boards/board.model';


let  { boards } = data;
let { tasks } = data;

/**
 * Returns  array of created boards or empty array if no boards were created
 * @param req - fastify request
 * @param reply - fastify reply
 * @returns array of created boards or empty array if no boards were created
 */

const getBoards = async (req:FastifyRequest, reply:FastifyReply) => {
    const result = boards.map(el => Board.toResponse(el));
    return reply
    .status(200)
    .send(result);
}



export type CustomRequest = FastifyRequest<{
    Params:{
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

const getBoard = (req:CustomRequest, reply:FastifyReply) => {
    const { id } = req.params;
    const board = boards.find((el) => el.id === id);
    if (!board) {
        return reply.status(404).send({
            errorMsg: `board with id ${id} not found`,
        });
    } 
        return reply
        .status(200)
        .send(Board.toResponse(board));
    

};

/**
 * Add created board to the array of boards
 * @param req - fastify request
 * @param reply - fastify reply
 * @returns added board(object)
 */

const addBoard = (req:CustomRequest, reply:FastifyReply) => {
    const board = new Board(req.body);
    boards.push(board);
    return reply
    .status(201)
    .send(Board.toResponse(board));
}

/**
 * Edit board with requested id
 * @param req - fastify request
 * @param reply - fastify reply
 * @returns edited board(object) or error 404 if board not found
 */

const editBoard = (req:CustomRequest, reply:FastifyReply) => {
    const { id } = req.params;
    const board = boards.find((el) => el.id === id);

    if(board) {
        board.title = req.body.title;
        board.columns = req.body.columns;
        return reply
        .status(200)
        .send(Board.toResponse(board));
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

const deleteBoard = (req:CustomRequest, reply:FastifyReply) => {
    const { id } = req.params;
    const board = boards.find((el) => el.id === id);
    if (board) {
        data.tasks = tasks.filter((el) => el.boardId !== id);    
        boards = boards.filter((el) => el !== board);
        
        return reply
        .status(204)
        .send();
    } 
        return reply
        .status(404)
        .send('Not found');
    
}


export { getBoards, getBoard, addBoard, editBoard, deleteBoard }