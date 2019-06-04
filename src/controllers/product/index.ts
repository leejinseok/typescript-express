'use strcit';

import { Request, Response, NextFunction } from 'express';
import productService from '../../services/product';

export default async (req: Request, res: Response, next: NextFunction) => {
  res.json(await productService.products(req.query));
}