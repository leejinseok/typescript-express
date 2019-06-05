import express from 'express';
import authController from './auth';

class GlobalController {
  router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.use('/auth', authController.router);
  }
}

export default GlobalController;