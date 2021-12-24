import { FastifyReply, FastifyRequest } from "fastify";
import { config } from './common/config';
import {TransportMultiOptions, pino} from 'pino'

const transport = pino.transport(<TransportMultiOptions>{
    level: config.LOG_LEVEL,
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
    targets: [{
        level: 'trace',
        target: 'pino/file',
        options: { destination: './src/logs/logs.json' }
    }, {
        level: 'error',
        target: 'pino/file',
        options: { destination: './src/logs/error.json' }
    }]
});

const logger = pino(transport);


export { logger }