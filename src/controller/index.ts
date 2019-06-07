'use strict';

import express from 'express';
import authController from './auth';
const router: express.Router = express.Router();

router.use('/auth', authController);

export default router;