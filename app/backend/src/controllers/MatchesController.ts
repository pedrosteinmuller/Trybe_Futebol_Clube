import { Request, Response } from 'express';
import { MatchesService } from '../services';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const { status, message } = await this.matchesService.getAll(inProgress as string);
    res.status(status).json(message);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { status, message } = await this.matchesService.finishMatch(+id);
    res.status(status).json(message);
  }

  async updatedMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { status, message } = await this.matchesService.updateMatch(+id, req.body);
    res.status(status).json(message);
  }
}
