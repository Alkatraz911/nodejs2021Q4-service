
const { getBoardsSchema } = require('../controllers/schemas/boards');
const { getBoards } = require('../controllers/handlers/boards');
const { getBoardSchema } = require('../controllers/schemas/boards');
const { getBoard } = require('../controllers/handlers/boards');
const { postBoardSchema } = require('../controllers/schemas/boards');
const { addBoard } = require('../controllers/handlers/boards');
const { editBoardSchema } = require('../controllers/schemas/boards');
const { editBoard } = require('../controllers/handlers/boards');
const { deleteBoardSchema } = require('../controllers/schemas/boards');
const { deleteBoard } = require('../controllers/handlers/boards');

const getBoardsOpts = {
    schema: getBoardsSchema,
    handler: getBoards
}

const getBoardOpts = {
    schema: getBoardSchema,
    handler: getBoard
}

const postBoardOpts = {
    schema: postBoardSchema,
    handler: addBoard
}

const editBoardOpts = {
    schema: editBoardSchema,
    handler: editBoard
}

const deleteBoardOpts = {
    schema: deleteBoardSchema,
    handler: deleteBoard
}

const boardsRoutes = (server, options, done) => {
    server.get('/boards', getBoardsOpts);
    server.get('/boards/:id', getBoardOpts);
    server.post('/boards', postBoardOpts);
    server.put('/boards/:id', editBoardOpts);
    server.delete('/boards/:id', deleteBoardOpts);
    done();
};


export { boardsRoutes }