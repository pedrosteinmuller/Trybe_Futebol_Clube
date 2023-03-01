import { Router, Request, Response } from 'express';
import tokenMiddleware from '../middlewares/tokenMiddleware';
import UserController from '../controllers/UsersController';
import middlewareLogin from '../middlewares/loginMiddleware';

const userController = new UserController();

const userRoutes = Router();

userRoutes.post('/', middlewareLogin, (req: Request, res: Response) =>
  userController.login(req, res));

userRoutes.get('/role', tokenMiddleware, UserController.userRole);

export default userRoutes;
