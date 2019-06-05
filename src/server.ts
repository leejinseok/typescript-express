'use strict';

import express from 'express';
import { Request, Response, NextFunction} from "express";
import bodyParser from 'body-parser';
import db from './database/db';

import errorMiddleware from "./middlewares/errorMiddleware";
import accessMiddleware from "./middlewares/accessMiddleware";

import GlobalController from "./controllers";

class Server {
  app: express.Application;
  globalController: GlobalController;

  constructor() {
    this.globalController = new GlobalController();
    this.app = express();
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
    app.use(accessMiddleware);
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