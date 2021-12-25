import { FastifyReply, FastifyRequest, FastifyError } from "fastify";
import { server } from "./server";



const INTERNAL_SERVER_ERROR = 500;


class ServerError implements FastifyError {
    code = String(INTERNAL_SERVER_ERROR);
    name = 'INTERNAL SERVER ERROR';
    statusCode = INTERNAL_SERVER_ERROR;
    message = 'INTERNAL SERVER ERROR'
}


const customErrorHandler = (error:unknown, request:FastifyRequest, reply:FastifyReply) => {
    if ( error instanceof ServerError ) {
        server.log.error(`${new Date() } ${  error.message}`);
        reply.status(error.statusCode).send(error.message);
        
    } else {
        throw error;
    }
};


export { customErrorHandler,  ServerError }