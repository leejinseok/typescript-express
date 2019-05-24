'use strcit';

import productService from '../../services/product';

export default (req, res, next) => {
  res.json(productService.products(req.query));
}