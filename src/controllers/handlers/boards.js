/* eslint-disable */
const { boards } = require('../../db/data');
const Board = require('../../resources/boards/board.model');

const getBoards = async (req, reply) => {
    reply.header('Content-Type', 'application/json');
    let result = boards.map(el => Board.toResponse(el));
    return reply
    .status(200)
    .send(result);
}

const getBoard = (req, reply) => {
    const { id } = req.params;
    let board = boards.find((el) => el.id === id);
    if (!board) {
        return reply.status(404).send({
            errorMsg: `board with id ${id} not found`,
        });
    }
    return reply
    .status(200)
    .send(Board.toResponse(board));
};

const addBoard = (req, reply) => {
    let board = new Board(req.body);
    boards.push(board);
    return reply
    .status(201)
    .send(Board.toResponse(board));
}

const editBoard = (req, reply) => {
    const { id } = req.params;
    let board = boards.find((el) => el.id === id);
    const keys = Object.keys(req.body);
    for (const el of keys){
        board[el] = req.body[el]
    }
    return reply
    .status(200)
    .send(Board.toResponse(board));
}

const deleteBoard = (req, reply) => {
    const { id } = req.params;
    const index = boards.findIndex(el => el.id === id);
    const result = boards.splice(index, index + 1);
    return reply
    .status(200)
    .send(Board.toResponse(result));
}


module.exports =  { getBoards, getBoard, addBoard, editBoard, deleteBoard }