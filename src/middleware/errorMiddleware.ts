'use strict';

import {Request, Response, NextFunction} from 'express';

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
};