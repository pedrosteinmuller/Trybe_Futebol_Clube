import { Request, Response, Router } from 'express';
import tokenMiddleware from '../middlewares/tokenMiddleware';
import { MatchesController } from '../controllers';

const matchController = new MatchesController();

const matcheRouter = Router();

matcheRouter.get('/', (req: Request, res: Response) => matchController.getAll(req, res));

matcheRouter.post('/', tokenMiddleware, (req: Request, res: Response) =>
  matchController.createMatch(req, res));

matcheRouter.patch('/:id/finish', tokenMiddleware, (req: Request, res: Response) => matchController
  .finishMatch(req, res));

matcheRouter.patch('/:id', tokenMiddleware, (req: Request, res: Response) =>
  matchController.updatedMatch(req, res));

export default matcheRouter;
