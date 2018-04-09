'use strict';

const Hapi = require('hapi');
const routes = require('./routes');


const server = Hapi.server({
    port: process.env.PORT || 5000,
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