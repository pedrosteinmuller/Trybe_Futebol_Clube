import MatchesModel from "../../database/models/MatchesModel";
import TeamsModel from "../../database/models/TeamsModel";

const mockListTeam: TeamsModel[] = [
  new TeamsModel({ id: 1, teamName: 'Flamengo' }),
  new TeamsModel({ id: 2, teamName: 'Cruzeiro' }),
];

const mockListMatche: MatchesModel[] = [
  new MatchesModel({
    id: 1,
    homeTeamId: 1,
    homeTeamGoals: 2,
    awayTeamId: 2,
    awayTeamGoals: 1,
    inProgress: false,
  }),
  new MatchesModel({
    id: 2,
    homeTeamId: 2,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 2,
    inProgress: false,
  }),
];

const mockResult = [
  {
    name: 'Flamengo',
    totalPoints: 3,
    totalGames: 1,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 2,
    goalsOwn: 1,
    goalsBalance: 1,
    efficiency: '100.00',
  },
  {
    name: 'Cruzeiro',
    totalPoints: 0,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 1,
    goalsOwn: 2,
    goalsBalance: -1,
    efficiency: '0.00',
  },
];

export { mockListMatche, mockResult, mockListTeam }