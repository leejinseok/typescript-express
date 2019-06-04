'use strict';

import { Request, Response, NextFunction} from "express";

export default function(req: Request, res: Response, next: NextFunction) {
  const origin = req.headers.origin;

  res.setHeader('Access-Control-Allow-Origin', origin ? origin : '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-W-Client, X-W-Device, X-W-Country, X-W-Group, X-W-Character, Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', 86400);

  next();
}