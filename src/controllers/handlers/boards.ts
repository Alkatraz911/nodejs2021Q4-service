
import { FastifyReply, FastifyRequest } from 'fastify';
import { data, Iboard } from'../../db/data';
import { Board } from '../../resources/boards/board.model';

const { boards } = data;


const getBoards = async (req:FastifyRequest, reply:FastifyReply) => {
    const result = boards.map(el => Board.toResponse(el));
    return reply
    .status(200)
    .send(result);
}

export type CustomRequest = FastifyRequest<{
    Params:{
        id: string|undefined;
    }

    Body: Iboard;
}>

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

const addBoard = (req:CustomRequest, reply:FastifyReply) => {
    const board = new Board(req.body);
    boards.push(board);
    return reply
    .status(201)
    .send(Board.toResponse(board));
}

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
}

const deleteBoard = (req:CustomRequest, reply:FastifyReply) => {
    const { id } = req.params;
    const index = boards.findIndex(el => el.id === id);
    const result = boards.splice(index, index + 1);
    return reply
    .status(200)
    .send(result.forEach(el => Board.toResponse(el)));
}


export { getBoards, getBoard, addBoard, editBoard, deleteBoard }