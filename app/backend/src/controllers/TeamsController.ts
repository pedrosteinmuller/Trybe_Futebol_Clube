import { Request, Response } from 'express';
import TeamsService from '../services';

export default class TeamsController {
  constructor(private teamService = new TeamsService()) {}

  async getAll(_req: Request, res: Response) {
    const result = await this.teamService.getAll();
    res.status(200).json(result);
  }
}
