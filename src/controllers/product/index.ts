'use strcit';

import { Request, Response, NextFunction } from 'express';
import productService from '../../services/product';

/**
 * GET /api
 * List of API examples.
 */
export default async (req: Request, res: Response, next: NextFunction) => {
  res.json(await productService.products(req.query));
}