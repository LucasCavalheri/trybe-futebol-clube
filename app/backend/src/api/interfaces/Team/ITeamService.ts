import { ITeam } from './ITeam';

export interface ITeamService {
  findAll(): Promise<ITeam[]>;
}
