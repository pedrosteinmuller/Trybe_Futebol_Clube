import { Request, Response, Router } from 'express';
import { TeamsController } from '../controllers';

const teamController = new TeamsController();

const teamRouter = Router();

teamRouter.get('/', (req: Request, res: Response) => teamController.getAll(req, res));
teamRouter.get('/:id', (req: Request, res: Response) => teamController.getById(req, res));

export default teamRouter;
