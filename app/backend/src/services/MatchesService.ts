import { ModelStatic } from 'sequelize';
import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import { response, responseError } from '../utils/generateResult';
import IResponse from '../interfaces/IResponse';
import IUpdateMatch from '../interfaces/IUpdateMatch';
import ICreateMatch from '../interfaces/ICreateMatch';

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

    const progressTrue = resultMatches.filter((matche) => matche.inProgress);
    const progressFalse = resultMatches.filter((matche) => !matche.inProgress);

    if (inProgress === 'true') return response(200, progressTrue);
    if (inProgress === 'false') return response(200, progressFalse);

    return response(200, resultMatches);
  }

  async finishMatch(id: number): Promise<IResponse> {
    // Será validado que, ao finalizar uma partida
    //  a alteração é feita no banco de dados e na página.
    // com a informação acima, usamos o método update para fazer a atualizacao no banco
    await this.model.update({ inProgress: false }, { where: { id } });
    return response(200, { message: 'Finished' });
  }

  async updateMatch(id: number, body: IUpdateMatch): Promise<IResponse> {
    const matchToUpdate = await this.model.findByPk(id);
    if (matchToUpdate?.inProgress) {
      await this.model.update({ ...body }, { where: { id } });
    }
    return response(200, { message: 'Updated' });
  }

  async createMatch(body: ICreateMatch): Promise<IResponse> {
    if (body.homeTeamId === body.awayTeamId) {
      return responseError(422, 'It is not possible to create a match with two equal teams');
    }

    const homeTeam = await this.model.findByPk(body.homeTeamId);
    const awayTeam = await this.model.findByPk(body.awayTeamId);

    if (!homeTeam || !awayTeam) {
      return responseError(404, 'There is no team with such id!');
    }

    const createMatch = await this.model.create({ ...body, inProgress: true });
    return response(201, createMatch);
  }
}
