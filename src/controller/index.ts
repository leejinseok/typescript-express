'use strict';

import express from 'express';
import authController from './auth';
import postController from './post';
const router: express.Router = express.Router();

router.use('/auth', authController);
router.use('/posts', postController);

export default router;