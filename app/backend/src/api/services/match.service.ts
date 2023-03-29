import { ModelStatic } from 'sequelize';
import Match from '../../database/models/match.model';
import Team from '../../database/models/team.model';
import { IMatch } from '../interfaces/Match/IMatch';
import { IMatchService } from '../interfaces/Match/IMatchService';

export default class MatchService implements IMatchService {
  constructor(private matchModel: ModelStatic<Match> = Match) {}

  public findAll = async (matchProgress: string): Promise<IMatch[]> => {
    const inProgressCondition = matchProgress ? { matchProgress: JSON.parse(matchProgress) } : {};

    const matches = await this.matchModel.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: inProgressCondition,
    });

    return matches;
  };
}
