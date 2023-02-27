import { ModelStatic } from 'sequelize';
import TeamsModel from '../database/models/TeamsModel';

export default class TeamsService {
  protected model: ModelStatic<TeamsModel> = TeamsModel;

  async getAll(): Promise<TeamsModel[]> {
    const result = await this.model.findAll();
    return result;
  }
}
