'use strict';

import express from 'express';
import {Request, Response, NextFunction} from "express";
import PostService from "../../service/post";
const router: express.Router = express.Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const {title, content, userId} = req.body;
  res.json(await new PostService().addPost(title, content, userId));
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.json(await new PostService().findPosts(0, 10));
})

router.get('/:postId', async (req: Request, res: Response, next: NextFunction) => {
  res.json(await new PostService().findPost(req.params.postId));
});

router.delete('/:postId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await new PostService().deletePost(req.params.postId);
    res.send('success');
  } catch (error) {
    next(error);
  }
})

export default router;