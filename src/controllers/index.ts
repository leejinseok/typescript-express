'use strcit';

import express from 'express';
import AuthController from './auth';

class GlobalController {
  router: express.Router;
  authController: AuthController;

  constructor() {
    this.authController = new AuthController();
    this.router = express.Router();
    this.routes();
  }

  routes(): void {
    this.router.use('/auth', this.authController.router);
  }
}

export default GlobalController;