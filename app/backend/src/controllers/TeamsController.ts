import { Request, Response } from 'express';
import TeamsService from '../services';

export default class TeamsController {
  constructor(private teamService = new TeamsService()) {}

  async getAll(_req: Request, res: Response) {
    const result = await this.teamService.getAll();
    res.status(200).json(result);
  }

  public getById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const result = await this.teamService.getById(id);
    res.status(200).json(result);
  };
}
