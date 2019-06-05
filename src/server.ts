'use strict';

import express from 'express';
import { Request, Response, NextFunction} from "express";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import db from './database/db';
import {createConnection} from "typeorm";

import errorMiddleware from "./middlewares/errorMiddleware";
import accessMiddleware from "./middlewares/accessMiddleware";
import jwtMiddleware from './middlewares/jwtMiddleware';

import GlobalController from "./controllers";

class Server {
  app: express.Application;
  globalController: GlobalController;

  constructor() {
    this.globalController = new GlobalController();
    this.app = express();
  }

  initDb(): void {
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
      synchronize: true,
    }).then(connection => {
      // here you can start to work with your entities

    }).catch(error => console.log(error));
  }

  initializeDb(): void {
    db.authenticate().then(
      () => {
        console.log('DB Connection has been established');
      },
      (err: Error) => {
        console.error('Unable to connect to the DB:', err);
      },
    );
  }

  middleware(): void {
    const { app, globalController } = this;
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use(accessMiddleware);
    app.use(jwtMiddleware);
    app.use('/api/v1', globalController.router);
    app.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.send('Hello world');
    });
    app.use((req: Request, res: Response) => {
      res.send('404 not found!');
    });
    app.use(errorMiddleware);
  }

  listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  }
}

export default new Server();