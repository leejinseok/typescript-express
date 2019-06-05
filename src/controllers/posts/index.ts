'use strict';

import express from 'express';
import { Request, Response, NextFunction} from "express";
import PostService from "../../services/posts";

class PostController {
  router: express.Router;
  postService: PostService;

  constructor() {
    this.postService = new PostService();
    this.router = express.Router();
    this.routes();
  }

  routes(): void {
    this.router.post('/', this.addPost.bind(this));
  }

  async addPost(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        res.status(401).send('Please login first');
        return;
      }

      const { title, content } = req.body;
      if (!title || !content) {
        res.status(400).send('Bad Request');
        return;
      }

      res.json(await this.postService.addPost(req.user.id, title, content));
    } catch (error) {
      next(error);
    }
  }

}

export default PostController;