import ILeaderboard from '../interfaces/ILeaderboard';
import MatchesModel from '../database/models/MatchesModel';

export const homeTeamGoalCount = (matches: MatchesModel[]): number => {
  let totalGoals = 0;
  matches.forEach((match) => {
    totalGoals += match.homeTeamGoals;
  });
  return totalGoals;
};

export const awayTeamGoalCount = (matches: MatchesModel[]): number => {
  let totalGoals = 0;
  matches.forEach((match) => {
    totalGoals += match.awayTeamGoals;
  });
  return totalGoals;
};

export const getHomeTeamResults = (matches: MatchesModel[]) =>
  matches.reduce(
    (acc, curr) => ({
      victories: acc.victories + (curr.homeTeamGoals > curr.awayTeamGoals ? 1 : 0),
      losses: acc.losses + (curr.homeTeamGoals < curr.awayTeamGoals ? 1 : 0),
      draws: acc.draws + (curr.homeTeamGoals === curr.awayTeamGoals ? 1 : 0),
    }),
    { victories: 0, losses: 0, draws: 0 },
  );

// Para a função getHomeTeamResults calcular o total de vitorias, derrotas e empates, usei o método reduce para iterar sobre cada partida e acumular o numero de VDE em um objeto, ou seja, o objeto inicial { victories: 0, losses: 0, draws: 0 } para o acumulador.

export const totalScoreHome = (matches: MatchesModel[]): number => {
  const { victories, draws } = getHomeTeamResults(matches);
  const result = (victories * 3) + draws;
  return result;
};

export const totalScoreGoalsBalance = (matches: MatchesModel[]): number => {
  const goalsHome = homeTeamGoalCount(matches);
  const goalsAway = awayTeamGoalCount(matches);

  const result = goalsHome - goalsAway;
  return result;
};

export const calculateEfficiencyHome = (matche: MatchesModel[]): string => {
  const totalpoints = totalScoreHome(matche);
  const totalGames = matche.length;
  const result = (totalpoints / (totalGames * 3)) * 100;
  return result.toFixed(2);
};

export const objectResult = (team: string, matche: MatchesModel[]) => ({
  name: team,
  totalPoints: totalScoreHome(matche),
  totalGames: matche.length,
  totalVictories: getHomeTeamResults(matche).victories,
  totalDraws: getHomeTeamResults(matche).draws,
  totalLosses: getHomeTeamResults(matche).losses,
  goalsFavor: homeTeamGoalCount(matche),
  goalsOwn: awayTeamGoalCount(matche),
  goalsBalance: totalScoreGoalsBalance(matche),
  efficiency: calculateEfficiencyHome(matche),
});

export const orderResults = (teams: ILeaderboard[]) =>
  teams.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    if (b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;
    if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;
    if (b.goalsFavor !== a.goalsFavor) return b.goalsFavor - a.goalsFavor;
    return a.goalsOwn - b.goalsOwn;
  });
