'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import {createConnection} from "typeorm";
import errorMiddleware from './middleware/errorMiddleware';
import controller from './controller';

class Server {
  app: express.Application;
  constructor() {
    this.app = express();
  }

  syncDb():void {
    createConnection({
      type: "mysql",
      host: "localhost",
      port: 3307,
      username: "root",
      password: "1111",
      database: "blog",
      entities: [
        __dirname + "/entity/*.js"
      ],
      synchronize: false,
    }).then(connection => {
    }).catch(error => console.log(error));
  }

  init(): void {
    const { app } = this;
    app.use(bodyParser.urlencoded({ extended: false, limit: '1mb' }));
    app.use(bodyParser.json());
    app.use('/api/v1', controller);
    app.use(errorMiddleware);
    app.use((req, res, next) => {
      res.status(404).send('Not found page');
    });
  }

  run(port: number): void {
    this.app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  }
}

export default Server;