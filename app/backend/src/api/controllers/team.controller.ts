import { Request, Response } from 'express';
import { ITeam } from '../interfaces/Team/ITeam';
import { ITeamController } from '../interfaces/Team/ITeamController';
import TeamService from '../services/team.service';
import HttpStatus from '../utils/http-status.enum';

export default class TeamController implements ITeamController {
  constructor(private teamService = new TeamService()) {}

  public findAll = async (_req: Request, res: Response): Promise<Response | void> => {
    const allTeams: ITeam[] = await this.teamService.findAll();
    return res.status(HttpStatus.OK).json(allTeams);
  };

  public findByPk = async (req: Request, res: Response): Promise<Response | void> => {
    const { id } = req.params;
    const team: ITeam = await this.teamService.findByPk(+id);
    return res.status(HttpStatus.OK).json(team);
  };
}
