import { FastifyReply } from 'fastify';
import { CustomRequest } from './users';
import { userRepository } from '../../resources/users/user.repository';
import {
	StatusCodes,
	getReasonPhrase
} from 'http-status-codes';
<<<<<<< HEAD
<<<<<<< HEAD
import {compare} from 'bcrypt'
import { CustomRequest } from './users';
import { userRepository } from '../../resources/users/user.repository';
=======
>>>>>>> parent of a721e79 (fixed linter errors)
import { getJwt } from '../../services/jwt'
import {compare} from 'bcrypt'

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
<<<<<<< HEAD
            .find(el => el.login === login)
=======
            .find(user => user.login === login && user.password === password)
>>>>>>> parent of 354ebf6 (fixed tests passing)
=======
            .find(user => user.login === login)
>>>>>>> parent of a721e79 (fixed linter errors)
        if (!user) {
            return reply
            .status(StatusCodes.FORBIDDEN)
            .send(getReasonPhrase(StatusCodes.FORBIDDEN));
<<<<<<< HEAD
<<<<<<< HEAD
        } 
=======
        } else {
>>>>>>> parent of a721e79 (fixed linter errors)
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

=======
        }
        return reply
            .header('Content-Type','json')
            .status(StatusCodes.OK)
            .send({token: await getJwt(user)});
>>>>>>> parent of 354ebf6 (fixed tests passing)
};



export { loginUser }