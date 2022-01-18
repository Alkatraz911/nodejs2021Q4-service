import { FastifyReply } from 'fastify';
import { CustomRequest } from './users';
import { userRepository } from '../../resources/users/user.repository';
import {
	StatusCodes,
	getReasonPhrase
} from 'http-status-codes';
import { getJwt } from '../../services/jwt'

async function loginUser(req: CustomRequest, reply: FastifyReply) {
    
        const { login, password } = req.body;

        if (!login || !password) {
            reply.status(StatusCodes.BAD_REQUEST).send(getReasonPhrase(StatusCodes.BAD_REQUEST));
        }
        const user =  (await userRepository
            .getAllUsers())
            .find(user => user.login === login && user.password === password)
        if (!user) {
            return reply
            .status(StatusCodes.FORBIDDEN)
            .send(getReasonPhrase(StatusCodes.FORBIDDEN));
        }
        return reply
            .header('Content-Type','json')
            .status(StatusCodes.OK)
            .send({token: await getJwt(user)});
};



export { loginUser }