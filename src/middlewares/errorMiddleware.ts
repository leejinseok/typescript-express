import { Request, Response } from "express";

export default function (err: Error, req: Request, res: Response) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
};