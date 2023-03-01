import { Request, Response } from 'express';
import { MatchesService } from '../services';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const { status, message } = await this.matchesService.getAll(inProgress as string);
    res.status(status).json(message);
  }
}
