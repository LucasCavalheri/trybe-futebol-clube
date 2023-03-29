import { ITeam } from './ITeam';

export interface ITeamService {
  findAll(): Promise<ITeam[]>;
  findByPk(id: number): Promise<ITeam>;
}
