import { ModelStatic } from 'sequelize';
import Team from '../../database/models/team.model';
import { ITeam } from '../interfaces/Team/ITeam';
import { ITeamService } from '../interfaces/Team/ITeamService';

export default class TeamService implements ITeamService {
  constructor(private teamModel: ModelStatic<Team> = Team) {}

  async findAll(): Promise<ITeam[]> {
    const allTeams: ITeam[] = await this.teamModel.findAll();
    return allTeams;
  }
}
