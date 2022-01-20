import { FastifyReply } from 'fastify';
import {
	StatusCodes,
	getReasonPhrase
} from 'http-status-codes';
import {compare} from 'bcrypt'
import { CustomRequest } from './users';
import { userRepository } from '../../resources/users/user.repository';
import { getJwt } from '../../services/jwt'


async function loginUser(req: CustomRequest, reply: FastifyReply) {
    
        const { login, password } = req.body;

        if (!login || !password) {
            reply.status(StatusCodes.BAD_REQUEST).send(getReasonPhrase(StatusCodes.BAD_REQUEST));
        }
        const user =  (await userRepository
            .getAllUsers())
            .find(el => el.login === login)
        if (!user) {
            return reply
            .status(StatusCodes.FORBIDDEN)
            .send(getReasonPhrase(StatusCodes.FORBIDDEN));
        } 
            const isValid = await compare(password,user.password);
            if(isValid) {
                const token = await getJwt(user);
                return reply
                .status(StatusCodes.OK)
                .send({ token });
            } 
                return reply
                .status(StatusCodes.FORBIDDEN)
                .send(getReasonPhrase(StatusCodes.FORBIDDEN));
            
        

};



export { loginUser }