import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import { responseError, response } from '../utils/generateResult';
import ILogin from '../interfaces/ILogin';
import UsersModel from '../database/models/UsersModel';
import checkValidate from './validations/validateInputs';
import generateToken from '../utils/jwt';
import IResponse from '../interfaces/IResponse';

export default class UsersService {
  private model: ModelStatic<UsersModel> = UsersModel;

  async login(body: ILogin): Promise<IResponse> {
    const user = await this.model.findOne(
      { where: { email: body.email } },
    );
    console.log(user);
    const error = checkValidate(body);
    if (error) return responseError(401, 'Invalid email or password');

    const verifyPassword = bcrypt.compareSync(body.password, user?.password || '_');

    if (!user || !verifyPassword) {
      return responseError(401, 'Invalid email or password');
    }

    const { id, email, role, username } = user;
    const token = generateToken({ id, email, role, username });

    return response(200, { token });
  }
}
