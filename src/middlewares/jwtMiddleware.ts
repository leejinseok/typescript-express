'use strict';

import { Request, Response, NextFunction} from "express";
import JwtUtil from "../utils/jwt";

export default (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies['access_token'];
  if (accessToken) {
    const decoded = JwtUtil.verify(accessToken);
    req.user = decoded;
  }
  next();
}