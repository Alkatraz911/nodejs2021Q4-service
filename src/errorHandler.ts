import { FastifyReply, FastifyRequest, FastifyError } from "fastify";
import { server } from "./server";


const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;



class ValidationError implements FastifyError {
    code = String(BAD_REQUEST);
    name = 'BAD REQUEST';
    statusCode = BAD_REQUEST;
    message = 'BAD REQUEST'
}


class ServerError implements FastifyError {
    code = String(INTERNAL_SERVER_ERROR);
    name = 'INTERNAL SERVER ERROR';
    statusCode = INTERNAL_SERVER_ERROR;
    message = 'INTERNAL SERVER ERROR'
}


const customErrorHandler = (error:unknown, request:FastifyRequest, reply:FastifyReply) => {
    if (error instanceof ValidationError || error instanceof ServerError ) {
        server.log.error(new Date()+ ' ' + error.message);
        reply.status(error.statusCode).send(error.message);
        return;
    } else {
        throw error;
    }
};


export { customErrorHandler, ValidationError, ServerError }