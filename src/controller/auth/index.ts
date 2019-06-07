'use strict';

import express from 'express';
import { Request, Response, NextFunction } from "express";
import AuthService from '../../service/auth';
const router: express.Router = express.Router();

router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  const {email, name, password} = req.body;
  try {
    res.json(await new AuthService().signup(email, name, password));
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  const {email, password} = req.body;
  try {
    res.json(await new AuthService().login(email, password));
  } catch (error) {
    if (error.message === 'no exist user') {
      res.status(401).send(error.message);
      return;
    }

    if (error.message === 'password not matched') {
      res.status(401).send(error.message);
      return;
    }

    next(error);
  }
});

export default router;