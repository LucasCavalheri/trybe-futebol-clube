import { Request, Response } from 'express';

export interface IMatchController {
  findAll(req: Request, res: Response): Promise<Response | void>;
  finishMatch(req: Request, res: Response): Promise<Response>;
}
