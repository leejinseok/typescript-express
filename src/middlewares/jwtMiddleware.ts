'use strict';

import { Request, Response, NextFunction} from "express";
import JwtUtil from "../utils/jwt";

export default (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies['access_token'];
  if (accessToken) {
    req.user = JwtUtil.verify(accessToken);
  }
  next();
}