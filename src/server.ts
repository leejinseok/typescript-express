'use strict';

import express from 'express';
import db from './database/db';

import productController from './controllers/product';

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

  ensureDb() {
    return new Promise((resolve, reject) => {
      let counter = 0;
      const tryConnect = async () => {
        try {
          await db.authenticate();
          resolve();
        } catch (e) {
          counter++;
          console.log(`db connection failed ${counter}`);
          if (counter > 5) {
            reject(new Error('Failed after 5 retries'));
            return;
          }
          setTimeout(tryConnect, 10);
        }
      };
      tryConnect();
    });
  }

  middleware(): void {
    const { app } = this;
    app.use(async (req, res, next) => {
      try {
        await this.ensureDb();
        next();
      } catch (e) {
        next(e);
      }
    });
    app.get('/', (req: express.Request, res: express.Response) => {
      res.send('hello world');
    });
    app.get('/api/v1/products', productController);
    app.use((req: express.Request, res: express.Response,) => {
      res.send('404 not found!');
    })
  }

  listen(port: Number): void {
    this.app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  }
}

export default new Server();