import { ModelStatic } from 'sequelize';
import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import { response } from '../utils/generateResult';
import IResponse from '../interfaces/IResponse';

export default class MatchesService {
  protected model: ModelStatic<MatchesModel> = MatchesModel;

  async getAll(inProgress: string): Promise<IResponse> {
    const resultMatches = await this.model.findAll({
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    if (!inProgress) return response(200, resultMatches);
    return response(200, resultMatches);
  }
}
