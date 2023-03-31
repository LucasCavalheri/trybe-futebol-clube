import { Request, Response } from 'express';

export interface ILeaderboardController {
  homeLeaderboard(req: Request, res: Response): Promise<Response | void>;
}
