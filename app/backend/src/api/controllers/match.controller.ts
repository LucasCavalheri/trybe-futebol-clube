import { Request, Response } from 'express';
import { IMatchController } from '../interfaces/Match/IMatchController';
import MatchService from '../services/match.service';
import HttpStatus from '../utils/http-status.enum';

export default class MatchController implements IMatchController {
  constructor(private matchService = new MatchService()) {}

  public findAll = async (req: Request, res: Response): Promise<Response | void> => {
    const { inProgress } = req.query;

    const matches = await this.matchService.findAll(inProgress as string);
    return res.status(HttpStatus.OK).json(matches);
  };
}
