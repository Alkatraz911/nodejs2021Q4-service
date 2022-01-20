import  jwt from 'jsonwebtoken';
import { FastifyReply, FastifyRequest } from 'fastify';
import {
	StatusCodes,
	getReasonPhrase
} from 'http-status-codes';
import { Iuser } from '../db/data';
import { config } from '../common/config';


const getJwt = (user:Iuser) => {
    const {id, login} = user;
     return  jwt.sign({id, login},config.JWT_SECRET, {expiresIn: '1d'});
}

const validateJwt = async (req:FastifyRequest, reply:FastifyReply) => {
    const  { authorization }  =  req.headers;

    if (authorization) {
        const [type, token] = authorization.split(' ')
        if(token) {
            if(type !== 'Bearer') {
                reply
                .status(StatusCodes.UNAUTHORIZED)
                .send(getReasonPhrase(StatusCodes.UNAUTHORIZED))
            } else {
                jwt.verify(token, config.JWT_SECRET, (err) => {
                    if (err) {
                        reply
                        .status(StatusCodes.UNAUTHORIZED)
                        .send(getReasonPhrase(StatusCodes.UNAUTHORIZED))
                    } else {
                        reply
                        .status(StatusCodes.OK)
                        
                    }
                })
            }
        }
    } else {
        reply
        .status(StatusCodes.UNAUTHORIZED)
        .send(getReasonPhrase(StatusCodes.UNAUTHORIZED))
    }

}


export { getJwt, validateJwt }