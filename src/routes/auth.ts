import  { FastifySchema,  FastifyReply, FastifyPluginCallback} from 'fastify';
import { DefaultRoute } from 'fastify/types/route.d';
import { loginUser } from '../controllers/handlers/loginUser'
import { postUserSchema } from '../controllers/schemas/users';
import { CustomRequest } from '../controllers/handlers/users';

interface CustomRoute {
    schema: FastifySchema;
    handler: DefaultRoute<CustomRequest, FastifyReply>;
}


const loginUserOpts: CustomRoute = {
    schema: postUserSchema,
    handler: loginUser
}

const authRoute:FastifyPluginCallback =  (server, _option, done) => {
    server.post('/login', loginUserOpts);
    done();
};

export { authRoute }