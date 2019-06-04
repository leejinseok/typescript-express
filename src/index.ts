'use strict';

import dotenv from 'dotenv';
dotenv.config();
import server from './server';

server.middleware();
server.initializeDb();
server.listen(3000);

