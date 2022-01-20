import { DefaultRoute } from 'fastify/types/route.d';
import  { FastifySchema,  FastifyReply, FastifyPluginCallback} from 'fastify';
import { getBoardsSchema, getBoardSchema, postBoardSchema, editBoardSchema, deleteBoardSchema } from '../controllers/schemas/boards';
import { getBoards, getBoard, addBoard, editBoard, deleteBoard , CustomRequest} from '../controllers/handlers/boards';
import { validateJwt } from '../services/jwt'
 


interface CustomRoute {
    schema: FastifySchema;
    handler: DefaultRoute<CustomRequest, FastifyReply>;
    preValidation: DefaultRoute<CustomRequest, FastifyReply>;
}

const getBoardsOpts:CustomRoute = {
    schema: getBoardsSchema,
    handler: getBoards,
    preValidation: validateJwt,
}

const getBoardOpts:CustomRoute = {
    schema: getBoardSchema,
    handler: getBoard,
    preValidation: validateJwt,
}

const postBoardOpts:CustomRoute = {
    schema: postBoardSchema,
    handler: addBoard,
    preValidation: validateJwt,
}

const editBoardOpts:CustomRoute = {
    schema: editBoardSchema,
    handler: editBoard,
    preValidation: validateJwt,
}

const deleteBoardOpts:CustomRoute = {
    schema: deleteBoardSchema,
    handler: deleteBoard,
    preValidation: validateJwt,
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