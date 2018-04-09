'use strict';

const Hapi = require('hapi');
const routes = require('./routes');

const port = process.env.PORT || 8000
const server = Hapi.server({
    port: port,
    host: 'localhost'
});

server.route(routes);

const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();