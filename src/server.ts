'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import {createConnection} from "typeorm";
import {useExpressServer} from 'routing-controllers';
import AuthController from './controller/auth';
import PostController from './controller/post';
import CustomErrorHandler from "./middleware/customErrorHandler";

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
    app.use(morgan('tiny'));
    app.use(bodyParser.urlencoded({ extended: false, limit: '1mb' }));
    app.use(bodyParser.json());
    useExpressServer(app, {
      controllers: [
        AuthController,
        PostController
      ],
      middlewares: [
        CustomErrorHandler
      ]
    });
  }

  run(port: number): void {
    this.app.listen(port, () => {
      console.log(`api server running on http://localhost:${port}`);
    });
  }
}

export default Server;