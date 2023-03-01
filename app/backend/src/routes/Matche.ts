import { Request, Response, Router } from 'express';
import { MatchesController } from '../controllers';

const matchController = new MatchesController();

const matcheRouter = Router();

matcheRouter.get('/', (req: Request, res: Response) => matchController.getAll(req, res));

export default matcheRouter;
