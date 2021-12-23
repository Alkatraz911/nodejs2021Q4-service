import { FastifyReply, FastifyRequest } from "fastify";

const logger = {
    // prettyPrint: {
    //     translateTime: 'SYS:standard yyyy-mm-dd HH:MM:ss.l o',
    //     ignore: 'pid,level',
    // },
    file: './src/logs/logs.json',
    serializers: {
        res(reply:FastifyReply) {
            return {
                statusCode: reply.statusCode,
            }
        },
        req(request:FastifyRequest) {
            return {
                method: request.method,
                url: request.url,
                path: request.routerPath,
                parameters: request.params,
                query: request.query,
            };
        }
    },

}




export { logger }