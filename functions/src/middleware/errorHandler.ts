import { Request, Response, NextFunction } from 'express';
import ApiError from '../lib/errors/apiError';

export default (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let status = 500;
  let message = 'Unknown Error Occurred';
  let errors = {};
  if (err instanceof ApiError) {
    status = err.status;
    message = err.message;
    errors = err.errors;
  }

  res.status(status).json({ message, errors });
};
