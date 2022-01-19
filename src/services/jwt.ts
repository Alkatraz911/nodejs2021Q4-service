import  jwt from 'jsonwebtoken';
import { Iuser } from '../db/data';
import { config } from '../common/config';
import { FastifyReply, FastifyRequest } from 'fastify';
import {
	StatusCodes,
	getReasonPhrase
} from 'http-status-codes';


const getJwt = (user:Iuser) => {
    const {id, login} = user;
     return  jwt.sign({id: id, login: login},config.JWT_SECRET, {expiresIn: '1d'});
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
                jwt.verify(token, config.JWT_SECRET, (err,decoded) => {
                    if (err) {
                        reply
                        .status(StatusCodes.UNAUTHORIZED)
                        .send(getReasonPhrase(StatusCodes.UNAUTHORIZED))
                    } else {
                        reply
                        .status(StatusCodes.OK)
                        return
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