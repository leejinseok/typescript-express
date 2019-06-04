import express from 'express';
import { Request, Response, NextFunction} from "express";
import authService from '../../services/auth';

class AuthController {
  router: express.Router;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  routes(): void {
    const { router } = this;
    router.post('/login', this.login);
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.json(await authService.login());
    } catch(error) {
      next(error);
    }
  }
}

export default new AuthController();
