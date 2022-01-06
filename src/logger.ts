import { FastifyReply, FastifyRequest } from "fastify";
import {TransportMultiOptions, pino} from 'pino'
import { config } from './common/config';
import path from 'path'
import { setFlagsFromString } from "v8";

const transport = pino.transport(<TransportMultiOptions> {
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
        options: { destination: path.resolve(process.cwd(), 'src/logs/logs.json')   }
    }, {
        level: 'error',
        target: 'pino/file',
        options: { destination: path.resolve(process.cwd(), 'src/logs/error.json')  }
    }]
});

const logger = pino(transport);



export { logger }