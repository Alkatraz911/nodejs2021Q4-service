import { FastifyReply } from 'fastify';
import { CustomRequest } from './users';
import { userRepository } from '../../resources/users/user.repository';
import {
	StatusCodes,
	getReasonPhrase
} from 'http-status-codes';
import { getJwt } from '../../services/jwt'
import {compare} from 'bcrypt'


async function loginUser(req: CustomRequest, reply: FastifyReply) {
    
        const { login, password } = req.body;

        if (!login || !password) {
            reply.status(StatusCodes.BAD_REQUEST).send(getReasonPhrase(StatusCodes.BAD_REQUEST));
        }
        const user =  (await userRepository
            .getAllUsers())
            .find(user => user.login === login)
        if (!user) {
            return reply
            .status(StatusCodes.FORBIDDEN)
            .send(getReasonPhrase(StatusCodes.FORBIDDEN));
        } else {
            const isValid = await compare(password,user.password);
            if(isValid) {
                const token = await getJwt(user);
                return reply
                .status(StatusCodes.OK)
                .send({ token });
            } else {
                return reply
                .status(StatusCodes.FORBIDDEN)
                .send(getReasonPhrase(StatusCodes.FORBIDDEN));
            }
        }

};



export { loginUser }