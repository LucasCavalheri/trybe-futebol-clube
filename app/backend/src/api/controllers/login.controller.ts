import { Request, Response } from 'express';
import { ILoginController } from '../interfaces/Login/ILoginController';
import { IUser } from '../interfaces/Users/IUser';
import LoginService from '../services/login.service';
import HttpStatus from '../utils/http-status.enum';

export default class LoginController implements ILoginController {
  constructor(private loginService = new LoginService()) {}

  public login = async (req: Request, res: Response): Promise<Response | void> => {
    const { email, password } = req.body as IUser;

    const token = await this.loginService.login(email, password);

    return res.status(HttpStatus.OK).json({ token });
  };

  public loginWithRole = async (req: Request, res: Response): Promise<Response | void> => {
    const { email } = req.body.user as IUser;

    const role: string | undefined = await this.loginService.loginWithRole(email);
    return res.status(HttpStatus.OK).json({ role });
  };
}
