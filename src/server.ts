'use strict';

import express from 'express';
import productController from './controllers/product';

class Server {
  app: express.Application;

  constructor() {
    this.app = express();  
  }

  middleware(): void {
    const { app } = this;
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