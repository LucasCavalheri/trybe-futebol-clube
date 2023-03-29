import { NextFunction, Request, Response } from 'express';
import HttpException from '../errors/HttpException';
import ErrorMessage from '../utils/error-messages.enum';
import HttpStatus from '../utils/http-status.enum';
import userSchema from '../validations/UserSchema';

const validateEmailAndPassField = (email: string, password: string) => {
  if (email === '') {
    throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessage.EMPTY_FIELDS);
  }
  if (password === '') {
    throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessage.EMPTY_FIELDS);
  }
};

const validateLogin = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { error } = userSchema.validate(req.body);

  validateEmailAndPassField(req.body.email, req.body.password);

  if (error?.message === ErrorMessage.EMPTY_FIELDS) {
    throw new HttpException(HttpStatus.BAD_REQUEST, error.message);
  }

  if (error) throw new HttpException(HttpStatus.UNAUTHORIZED, error.message);

  next();
};

export default validateLogin;
