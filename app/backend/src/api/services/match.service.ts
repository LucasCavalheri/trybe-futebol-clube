import { ModelStatic } from 'sequelize';
import Match from '../../database/models/match.model';
import Team from '../../database/models/team.model';
import HttpException from '../errors/HttpException';
import { IGoal } from '../interfaces/Match/IGoal';
import { IMatch } from '../interfaces/Match/IMatch';
import { IMatchService } from '../interfaces/Match/IMatchService';
import ErrorMessage from '../utils/error-messages.enum';
import HttpStatus from '../utils/http-status.enum';

export default class MatchService implements IMatchService {
  constructor(private matchModel: ModelStatic<Match> = Match) {}

  public findAll = async (matchProgress: string): Promise<IMatch[]> => {
    const inProgressCondition = matchProgress ? { inProgress: JSON.parse(matchProgress) } : {};

    const matches = await this.matchModel.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: inProgressCondition,
    });

    return matches;
  };

  public finishMatch = async (matchId: number): Promise<string> => {
    await this.matchModel.update({ inProgress: false }, { where: { id: matchId } });
    return 'Finished';
  };

  public finishInProgressMatch = async (matchId: number, goals: IGoal): Promise<string> => {
    await this.matchModel.update(
      {
        homeTeamGoals: goals.homeTeamGoals,
        awayTeamGoals: goals.awayTeamGoals,
      },
      { where: { id: matchId } },
    );
    return 'Match Finished';
  };

  private teamsAreSame = async (homeId: number, awayId: number): Promise<void> => {
    if (homeId === awayId) {
      throw new HttpException(HttpStatus.UNPROCESSABLE_CONTENT, ErrorMessage.EQUAL_TEAMS);
    }
  };

  private teamExists = async (homeId: number, awayId: number): Promise<void> => {
    const teamPromises = [homeId, awayId].map(async (id) => this.matchModel.findByPk(id));
    const teams = await Promise.all(teamPromises);

    if (teams.some((el) => !el)) { // team are undefined
      throw new HttpException(HttpStatus.NOT_FOUND, ErrorMessage.TEAM_NOT_FOUND);
    }
  };

  public create = async (match: IMatch): Promise<IMatch> => {
    await this.teamsAreSame(match.homeTeamId, match.awayTeamId);
    await this.teamExists(match.homeTeamId, match.awayTeamId);

    const newMatch: IMatch = await this.matchModel.create({
      ...match, inProgress: true,
    });

    return newMatch;
  };
}
