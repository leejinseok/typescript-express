'use strcit';

import express from 'express';
import AuthController from './auth';
import PostController from './posts';

class GlobalController {
  router: express.Router;
  authController: AuthController;
  postController: PostController;

  constructor() {
    this.authController = new AuthController();
    this.postController = new PostController();
    this.router = express.Router();
    this.routes();
  }

  routes(): void {
    const { router } = this;
    router.use('/auth', this.authController.router);
    router.use('/posts', this.postController.router);
  }
}

export default GlobalController;