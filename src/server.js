/* eslint-disable */
const { PORT } = require('./common/config');
const fastify = require('fastify');
const server = fastify({ logger: true });

server
.listen(PORT)
.catch(console.error);

module.exports = { server };
