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

  async syncDb(): Promise<any> {
    await createConnection({
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
    });

    console.log('데이터베이스 연결성공');
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
      console.log(`api server running on http://localhost:${port}`);
    });
  }
}

export default Server;