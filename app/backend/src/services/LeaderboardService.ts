import { ModelStatic } from 'sequelize';
import { orderResults, objectResult } from '../utils/functionsLeaderboard';
import ILeaderboard from '../interfaces/ILeaderboard';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';

export default class LeaderboardService {
  protected modelMatches: ModelStatic<MatchesModel> = MatchesModel;
  protected modelTeams: ModelStatic<TeamsModel> = TeamsModel;

  async getLeaderboardHome(): Promise<ILeaderboard[]> {
    const getTeam = await this.modelTeams.findAll();
    const getMatches = await this.modelMatches.findAll({ where: { inProgress: false } });
    const result: ILeaderboard[] = getTeam.map((t) => {
      const matche = getMatches.filter((m) => m.homeTeamId === t.id);
      return objectResult(t.teamName, matche);
    });

    return orderResults(result);
  }
}
