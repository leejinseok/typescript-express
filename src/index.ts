'use strict';

import Server from './server';
const server = new Server();

server.syncDb();
server.init();
server.run(3002);

