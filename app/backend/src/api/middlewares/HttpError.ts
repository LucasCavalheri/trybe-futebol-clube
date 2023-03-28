import { NextFunction, Request, Response } from 'express';
import HttpException from '../errors/HttpException';
import HttpStatus from '../utils/http-status.enum';

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
  res.status(status || HttpStatus.INTERNAL_ERROR).json({ message });
}

export default HttpErrorMiddleware;
