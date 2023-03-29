import { Request, Response } from 'express';

export interface ILoginController {
  login(req: Request, res: Response): Promise<Response | void>;
  loginWithRole(req: Request, res: Response): Promise<Response | void>;
}
