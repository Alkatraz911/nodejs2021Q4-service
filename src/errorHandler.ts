import { FastifyReply, FastifyRequest, FastifyError } from "fastify";
import { server } from "./server";
import {
	StatusCodes,
	getReasonPhrase
} from 'http-status-codes';



const INTERNAL_SERVER_ERROR = 500;


class ServerError implements FastifyError {
    code = String(INTERNAL_SERVER_ERROR);
    name = 'INTERNAL SERVER ERROR';
    statusCode = INTERNAL_SERVER_ERROR;
    message = 'INTERNAL SERVER ERROR'
}

class ValidationError implements FastifyError {
    code = String(StatusCodes.BAD_REQUEST);
    name = getReasonPhrase(StatusCodes.BAD_REQUEST);
    statusCode = StatusCodes.BAD_REQUEST;
    message = getReasonPhrase(StatusCodes.BAD_REQUEST);
}


const customErrorHandler = (error:unknown, _request:FastifyRequest, reply:FastifyReply) => {
    if ( error instanceof ServerError ) {
        server.log.error(`${new Date() } ${  error.message}`);
        reply.status(error.statusCode).send(error.message);
        
    } else if(error instanceof ValidationError){
        server.log.error(`${new Date() } ${  error.message}`);
        reply.status(error.statusCode).send(error.message);
    } else {
        throw error;
    }
};


export { customErrorHandler,  ServerError }