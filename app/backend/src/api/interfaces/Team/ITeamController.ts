import { Request, Response } from 'express';

export interface ITeamController {
  findAll(
    req: Request,
    res: Response,
  ): Promise<Response | void>;
}
