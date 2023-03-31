import { Request, Response } from 'express';
import { ILeaderboardController } from '../interfaces/Leaderboard/ILeaderboardController';
import { TeamType } from '../interfaces/Leaderboard/ILeaderboardService';
import LeaderboardService from '../services/leaderboard.service';
import HttpStatus from '../utils/http-status.enum';

export default class LeaderboardController implements ILeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public homeLeaderboard = async (req: Request, res: Response): Promise<Response | void> => {
    const newTypeTeamRoute = req.url.replace(/\//g, '').replace('leaderboard', '');
    // /leaderboard/away, a constante receberá só a string 'away'
    // /leaderboard/home, a constante receberá só a string 'home

    const typeOfTeam = newTypeTeamRoute || 'both';

    const leaderboard = await this.leaderboardService.homeLeaderboard(typeOfTeam as TeamType);
    return res.status(HttpStatus.OK).json(leaderboard);
  };
}
