/* eslint-disable */
const { PORT } = require('./common/config');
const fastify = require('fastify');
const server = fastify({ logger: true });
const router = require('./router');

server.register(router);


try {
    server.listen(PORT);

} catch (err) {
    server.log.error(err)
}

module.exports = { server };
