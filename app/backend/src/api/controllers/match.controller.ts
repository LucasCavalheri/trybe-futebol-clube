import { Request, Response } from 'express';
import { IGoal } from '../interfaces/Match/IGoal';
import { IMatch } from '../interfaces/Match/IMatch';
import { IMatchController } from '../interfaces/Match/IMatchController';
import MatchService from '../services/match.service';
import HttpStatus from '../utils/http-status.enum';

export default class MatchController implements IMatchController {
  constructor(private matchService = new MatchService()) {}

  public findAll = async (
    req: Request,
    res: Response,
  ): Promise<Response | void> => {
    const { inProgress } = req.query;

    const matches = await this.matchService.findAll(inProgress as string);
    return res.status(HttpStatus.OK).json(matches);
  };

  public finishMatch = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const finishedMatch = await this.matchService.finishMatch(+id);
    return res.status(HttpStatus.OK).json({ message: finishedMatch });
  };

  public finishInProgressMatch = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const matchGoals = req.body as IGoal;

    const finishedMatch = await this.matchService.finishInProgressMatch(+id, matchGoals);
    return res.status(HttpStatus.OK).json({ message: finishedMatch });
  };

  public create = async (req: Request, res: Response): Promise<Response | void> => {
    const match = req.body as IMatch;

    const newMatch = await this.matchService.create(match);
    return res.status(HttpStatus.CREATED).json(newMatch);
  };
}
