'use strict';

import { Request, Response, NextFunction} from "express";

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send('Something broken!');
}