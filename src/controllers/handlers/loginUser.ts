import { FastifyReply } from 'fastify';
import {
	StatusCodes,
	getReasonPhrase
} from 'http-status-codes';
<<<<<<< HEAD
import {compare} from 'bcrypt'
import { CustomRequest } from './users';
import { userRepository } from '../../resources/users/user.repository';
import { getJwt } from '../../services/jwt'

=======
import { getJwt } from '../../services/jwt'
>>>>>>> parent of 354ebf6 (fixed tests passing)

async function loginUser(req: CustomRequest, reply: FastifyReply) {
    
        const { login, password } = req.body;

        if (!login || !password) {
            reply.status(StatusCodes.BAD_REQUEST).send(getReasonPhrase(StatusCodes.BAD_REQUEST));
        }
        const user =  (await userRepository
            .getAllUsers())
<<<<<<< HEAD
            .find(el => el.login === login)
=======
            .find(user => user.login === login && user.password === password)
>>>>>>> parent of 354ebf6 (fixed tests passing)
        if (!user) {
            return reply
            .status(StatusCodes.FORBIDDEN)
            .send(getReasonPhrase(StatusCodes.FORBIDDEN));
<<<<<<< HEAD
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
            
        

=======
        }
        return reply
            .header('Content-Type','json')
            .status(StatusCodes.OK)
            .send({token: await getJwt(user)});
>>>>>>> parent of 354ebf6 (fixed tests passing)
};



export { loginUser }