import { ModelStatic } from 'sequelize';
import Team from '../../database/models/team.model';
import HttpException from '../errors/HttpException';
import { ITeam } from '../interfaces/Team/ITeam';
import { ITeamService } from '../interfaces/Team/ITeamService';
import HttpStatus from '../utils/http-status.enum';

export default class TeamService implements ITeamService {
  constructor(private teamModel: ModelStatic<Team> = Team) {}

  public findAll = async (): Promise<ITeam[]> => {
    const allTeams: ITeam[] = await this.teamModel.findAll();
    return allTeams;
  };

  public findByPk = async (id: number): Promise<ITeam> => {
    const team: ITeam | null = await this.teamModel.findByPk(id);

    if (!team) throw new HttpException(HttpStatus.NOT_FOUND, 'team not found');

    return team;
  };
}
