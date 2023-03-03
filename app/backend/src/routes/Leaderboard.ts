import { Request, Response, Router } from 'express';
import { LeaderboardController } from '../controllers';

const leaderboardController = new LeaderboardController();

const leaderboardRouter = Router();

leaderboardRouter.get('/', (req: Request, res: Response) =>
  leaderboardController.getResultsHome(req, res));

export default leaderboardRouter;
