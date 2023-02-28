import { Router, Request, Response } from 'express';
import UserController from '../controllers/UsersController';
import middlewareLogin from '../middlewares/loginMiddleware';

const userController = new UserController();

const userRoutes = Router();

userRoutes.post('/', middlewareLogin, (req: Request, res: Response) =>
  userController.login(req, res));

export default userRoutes;
