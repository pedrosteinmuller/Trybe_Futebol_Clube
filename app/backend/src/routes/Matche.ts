import { Request, Response, Router } from 'express';
import tokenMiddleware from '../middlewares/tokenMiddleware';
import { MatchesController } from '../controllers';

const matchController = new MatchesController();

const matcheRouter = Router();

matcheRouter.get('/', (req: Request, res: Response) => matchController.getAll(req, res));

matcheRouter.patch('/:id/finish', tokenMiddleware, (req: Request, res: Response) => matchController
  .finishMatch(req, res));

export default matcheRouter;
