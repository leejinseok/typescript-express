'use strict';

import express from 'express';
import {Request, Response, NextFunction} from "express";
import PostService from "../../service/post";
const router: express.Router = express.Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const {title, content, userId} = req.body;
  res.json(await new PostService().addPost(title, content, userId));
});

export default router;