'use strict';

import express from 'express';
import {Request, Response, NextFunction} from "express";
import PostService from "../../service/post";
const router: express.Router = express.Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const {title, content, userId} = req.body;
  try {
    res.json(await new PostService().addPost(title, content, userId));
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await new PostService().findPosts(0, 10));
  } catch (error) {
    next(error);
  }
});

router.get('/:postId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await new PostService().findPost(req.params.postId));
  } catch (error) {
    next(error);
  }
});

router.delete('/:postId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await new PostService().deletePost(req.params.postId);
    res.send('success');
  } catch (error) {
    next(error);
  }
});

export default router;