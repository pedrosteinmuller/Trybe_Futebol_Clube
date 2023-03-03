import { Request, Response, Router } from 'express';
import { LeaderboardController } from '../controllers';

const leaderboardController = new LeaderboardController();

const leaderboardRouter = Router();

leaderboardRouter.get('/home', (req: Request, res: Response) =>
  leaderboardController.getResultsHome(req, res));

leaderboardRouter.get('/away', (req: Request, res: Response) =>
  leaderboardController.getResultsAway(req, res));

export default leaderboardRouter;
