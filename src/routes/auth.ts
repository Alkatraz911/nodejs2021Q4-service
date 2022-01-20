import  { FastifySchema,  FastifyReply, FastifyPluginCallback} from 'fastify';
import { DefaultRoute } from 'fastify/types/route.d';
import { loginUser } from '../controllers/handlers/loginUser'
import { postUserSchema } from '../controllers/schemas/users';
import { CustomRequest } from '../controllers/handlers/users';

interface CustomRoute {
    schema: FastifySchema;
    handler: DefaultRoute<CustomRequest, FastifyReply>;
}

const getLoginOpts: CustomRoute = {
    schema: {},
    handler: (req,reply)=>{
        reply.send('Switch POST please')
    }
}

const postLoginOpts: CustomRoute = {
    schema: postUserSchema,
    handler: loginUser
}

const MainOpts: CustomRoute = {
    schema: {},
    handler: (req,reply) => {
        reply.send('Hello, to work with API you need to login first at localhost:4000/login URL')
    }
}

const authRoute:FastifyPluginCallback =  (server, _option, done) => {
    server.get('/login', getLoginOpts)
    server.post('/login', postLoginOpts);
    server.get('/', MainOpts)
    server.post('/', MainOpts)
    server.post('/doc', MainOpts)
    server.get('/doc', MainOpts)
    done();
};

export { authRoute }