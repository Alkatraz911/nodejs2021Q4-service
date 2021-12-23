import { FastifyReply, FastifyRequest } from "fastify";
import fs from 'fs';

const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;



class ValidationError extends Error {
    status = BAD_REQUEST;
    text = 'BAD REQUEST'
}


class ServerError extends Error {
    status = INTERNAL_SERVER_ERROR;
    text = 'INTERNAL SERVER ERROR';
}

const customErrorHandler = (error:unknown, request:FastifyRequest, reply:FastifyReply) => {
    if(error instanceof ValidationError||error instanceof ServerError ) {
        reply.status(error.status).send(error.text);
        return;
    } 
};

export { customErrorHandler }