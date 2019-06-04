'use strict';

import dotenv from 'dotenv';
dotenv.config();
import server from './server';

server.initializeDb();
server.middleware();
server.listen(3002);
