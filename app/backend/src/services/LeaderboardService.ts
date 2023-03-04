import { ModelStatic } from 'sequelize';
import { orderResults, objectResult, objectResultAll } from '../utils/functionsLeaderboard';
import ILeaderboard from '../interfaces/ILeaderboard';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';

export default class LeaderboardService {
  protected modelMatches: ModelStatic<MatchesModel> = MatchesModel;
  protected modelTeams: ModelStatic<TeamsModel> = TeamsModel;

  async getLeaderboardHome(): Promise<ILeaderboard[]> {
    const getTeam = await this.modelTeams.findAll();
    const getMatches = await this.modelMatches.findAll({ where: { inProgress: false } });
    const result: ILeaderboard[] = getTeam.map((team) => {
      const matche = getMatches.filter((match) => match.homeTeamId === team.id);
      return objectResult(team.teamName, matche, ['homeTeamGoals', 'awayTeamGoals']);
    });

    return orderResults(result);
  }

  async getLeaderboardAway(): Promise<ILeaderboard[]> {
    const getTeam = await this.modelTeams.findAll();
    const getMatches = await this.modelMatches.findAll({ where: { inProgress: false } });
    const result: ILeaderboard[] = getTeam.map((team) => {
      const matche = getMatches.filter((match) => match.awayTeamId === team.id);
      return objectResult(team.teamName, matche, ['awayTeamGoals', 'homeTeamGoals']);
    });

    return orderResults(result);
  }

  async getLeaderboardAll(): Promise<ILeaderboard[]> {
    const getTeam = await this.modelTeams.findAll();
    const getMatches = await this.modelMatches.findAll({ where: { inProgress: false } });
    const result: ILeaderboard[] = getTeam.map((team) => {
      const matcheHome = getMatches.filter((match) => match.homeTeamId === team.id);
      const matcheAway = getMatches.filter((match) => match.awayTeamId === team.id);
      return objectResultAll(team.teamName, matcheHome, matcheAway);
    });

    return orderResults(result);
  }
}
