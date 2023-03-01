import { Request, Response } from 'express';
import UserService from '../services/UsersService';

export default class UserController {
  private service: UserService = new UserService();

  async login(req: Request, res: Response) {
    const { status, message } = await this.service.login(req.body);
    res.status(status).json(message);
  }

  static userRole(_req: Request, res: Response) {
    const { payload } = res.locals.user;
    const { role } = payload;
    res.status(200).json({ role });
  }
}
