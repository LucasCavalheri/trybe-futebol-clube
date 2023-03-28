import { NextFunction, Request, Response } from 'express';
import HttpException from '../errors/HttpException';

function HttpErrorMiddleware(
  err: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof HttpException) {
    return res.status(err.status).json({ message: err.message });
  }

  const { status, message } = err;
  res.status(status || 500).json({ message });
}

export default HttpErrorMiddleware;
