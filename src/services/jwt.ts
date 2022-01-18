import  jwt from 'jsonwebtoken';
import { Iuser } from '../db/data';
import { config } from '../common/config';
import { FastifyReply, FastifyRequest } from 'fastify';


const getJwt = async (user:Iuser) => {
    const {id, login} = user;
     return  jwt.sign({id: id, login: login},config.JWT_SECRET, {expiresIn: '1d'});
}

const validateJwt = async (req:FastifyRequest, reply:FastifyReply) => {
    const { autorization } = req.headers;

    if (autorization) {
        let token:string = autorization[0];
        jwt.verify(token, config.JWT_SECRET, (err) => {
            if(err) {
                res
            }
        })
    }

}


export { getJwt, validateJwt }