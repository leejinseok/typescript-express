'use strict';

import express from 'express';
import { Request, Response, NextFunction } from "express";
import AuthService from '../../service/auth';
const router: express.Router = express.Router();

router.post('/signup', async (req, res, next) => {
  const {email, name, password} = req.body;

  try {
    res.json(await new AuthService().signup(email, name, password));
  } catch (error) {
    next(error);
  }

});

export default router;