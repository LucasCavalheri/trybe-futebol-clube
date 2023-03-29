import { IGoal } from './IGoal';
import { IMatch } from './IMatch';

export interface IMatchService {
  findAll(matchProgress: string): Promise<IMatch[]>;
  finishMatch(matchId: number): Promise<string>;
  finishInProgressMatch(matchId: number, goals: IGoal): Promise<string>;
  create(match: IMatch): Promise<IMatch>;
}
