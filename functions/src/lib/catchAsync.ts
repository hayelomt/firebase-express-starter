import { RequestHandler, Request, Response, NextFunction } from 'express';

export default (fn: RequestHandler) => (
  req: Request,
  res: Response,
  next: NextFunction
) => fn(req, res, next).catch(next);
