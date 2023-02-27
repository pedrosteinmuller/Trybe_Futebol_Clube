import { Request, Response, Router } from 'express';
import TeamController from '../controllers';

const teamController = new TeamController();

const teamRouter = Router();

teamRouter.get('/', (req: Request, res: Response) => teamController.getAll(req, res));

export default teamRouter;