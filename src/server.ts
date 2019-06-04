'use strict';

import express from 'express';
import { Request, Response, NextFunction} from "express";
import db from './database/db';

import productController from './controllers/product';
import errorMiddleware from "./middlewares/errorMiddleware";
import accessMiddleware from "./middlewares/accessMiddleware";

class Server {
  app: express.Application;

  constructor() {
    this.app = express();  
  }

  initializeDb(): void {
    db.authenticate().then(
      () => {
        console.log('DB Connection has been established');
      },
      (err: any) => {
        console.error('Unable to connect to the DB:', err);
      },
    );
  }

  middleware(): void {
    const { app } = this;
    app.use(accessMiddleware);
    app.get('/', (req: Request, res: Response, next: NextFunction) => {
      return next(new Error('hi'));
      res.send('hello world');
    });
    app.get('/api/v1/products', productController);
    app.use(errorMiddleware);
    app.use((req: Request, res: Response) => {
      res.send('404 not found!');
    });
  }

  listen(port: Number): void {
    this.app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  }
}

export default new Server();