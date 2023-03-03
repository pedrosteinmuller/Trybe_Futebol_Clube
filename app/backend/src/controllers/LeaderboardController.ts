import { Request, Response } from 'express';
import { LeaderboardService } from '../services';

export default class leaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  async getResultsHome(_req: Request, res: Response) {
    const result = await this.leaderboardService.getLeaderboardHome();
    res.status(200).json(result);
  }

  async getResultsAway(_req: Request, res: Response) {
    const result = await this.leaderboardService.getLeaderboardAway();
    res.status(200).json(result);
  }
}
