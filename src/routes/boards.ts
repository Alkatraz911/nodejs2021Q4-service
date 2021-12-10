
import { getBoardsSchema, getBoardSchema, postBoardSchema, editBoardSchema, deleteBoardSchema } from '../controllers/schemas/boards';
import{ getBoards, getBoard, addBoard, editBoard, deleteBoard } from '../controllers/handlers/boards';
import { DefaultRoute } from 'fastify/types/route';
import  { FastifySchema,  FastifyReply, FastifyPluginCallback} from 'fastify';
import { CustomRequest} from '../controllers/handlers/boards'


interface CustomRoute {
    schema: FastifySchema;
    handler: DefaultRoute<CustomRequest, FastifyReply>;
}

const getBoardsOpts:CustomRoute = {
    schema: getBoardsSchema,
    handler: getBoards
}

const getBoardOpts:CustomRoute = {
    schema: getBoardSchema,
    handler: getBoard
}

const postBoardOpts:CustomRoute = {
    schema: postBoardSchema,
    handler: addBoard
}

const editBoardOpts:CustomRoute = {
    schema: editBoardSchema,
    handler: editBoard
}

const deleteBoardOpts:CustomRoute = {
    schema: deleteBoardSchema,
    handler: deleteBoard
}

const boardsRoutes:FastifyPluginCallback = (server, _option, done) => {
    server.get('/boards', getBoardsOpts);
    server.get('/boards/:id', getBoardOpts);
    server.post('/boards', postBoardOpts);
    server.put('/boards/:id', editBoardOpts);
    server.delete('/boards/:id', deleteBoardOpts);
    done();
};


export { boardsRoutes }