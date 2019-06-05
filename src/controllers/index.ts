import express from 'express';
import AuthController from './auth';

class GlobalController {
  router: express.Router;
  authController: AuthController;

  constructor() {
    this.router = express.Router();
    this.authController = new AuthController();
  }

  routes(): void {
    this.authController.routes();
    this.router.use('/auth', this.authController.router);
  }
}

export default GlobalController;