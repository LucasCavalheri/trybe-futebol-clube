import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import HttpException from '../errors/HttpException';
import ErrorMessage from '../utils/error-messages.enum';
import HttpStatus from '../utils/http-status.enum';

export default function AuthMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const { authorization: token } = req.headers;

  if (!token) throw new HttpException(HttpStatus.UNAUTHORIZED, ErrorMessage.TOKEN_NOT_FOUND);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    req.body.user = payload;
    next();
  } catch (error) {
    throw new HttpException(
      HttpStatus.UNAUTHORIZED,
      ErrorMessage.TOKEN_NOT_VALID,
    );
  }
}
