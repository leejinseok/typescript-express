'use strict';

import { Request, Response, NextFunction} from "express";

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).send('Something broken!');
}