import { IMatch } from './IMatch';

export interface IMatchService {
  findAll(matchProgress: string): Promise<IMatch[]>;
}
