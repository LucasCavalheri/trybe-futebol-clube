import { Request, Response } from 'express';
import { ITeam } from '../interfaces/Team/ITeam';
import { ITeamController } from '../interfaces/Team/ITeamController';
import TeamService from '../services/team.service';

export default class TeamController implements ITeamController {
  constructor(private teamService = new TeamService()) {}

  public findAll = async (_req: Request, res: Response): Promise<Response | void> => {
    const allTeams: ITeam[] = await this.teamService.findAll();
    return res.status(200).json(allTeams);
  };
}
