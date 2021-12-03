/* eslint-disable */
const { PORT } = require('./common/config');
const fastify = require('fastify');
const server = fastify({ logger: true });
const {users, boards} = require('./router');

server.register(users);
server.register(boards);



try {
    server.listen(PORT);

} catch (err) {
    server.log.error(err)
}

module.exports = { server };
