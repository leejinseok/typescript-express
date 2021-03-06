'use strict';

import Server from './server';
import "reflect-metadata";

async function init () {
  const server = new Server();
  await server.syncDb();
  server.init();
  server.run(3002);
}

init();


