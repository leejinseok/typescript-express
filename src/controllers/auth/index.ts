import express from 'express';
import { Request, Response, NextFunction} from "express";
import authService from '../../services/auth';

class AuthController {
  router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.post('/login', this.login);
    this.router.post('/signup', this.signup);
  }

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, name, password } = req.body;
      if (!email || !name || !password) {
        res.status(400).send('Bad Request');
        return;
      }

      res.json(await authService.signup(email, name, password));
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      res.json(await authService.login(email, password));
    } catch(error) {
      next(error);
    }
  }
}

export default new AuthController();
