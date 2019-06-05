'use strict';

import express from 'express';
import { Request, Response, NextFunction} from "express";
import AuthService from '../../services/auth';

class AuthController {
  router: express.Router;
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
    this.router = express.Router();
    this.routes();
  }

  routes(): void {
    this.router.post('/login', this.login.bind(this));
    this.router.post('/signup', this.signup.bind(this));
  }

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, name, password } = req.body;
      if (!email || !name || !password) {
        res.status(400).send('Bad Request');
        return;
      }

      res.json(await this.authService.signup(email, name, password));
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).send('Bad Request');
        return;
      }

      const token = await this.authService.login(email, password);
      res.cookie('access_token', token, {
        httpOnly: true,
        path: '/',
        maxAge: 900000
      });

      res.send(token);
    } catch(error) {
      next(error);
    }
  }
}

export default AuthController;
