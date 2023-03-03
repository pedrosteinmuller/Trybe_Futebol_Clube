import ILeaderboard from '../interfaces/ILeaderboard';
import MatchesModel from '../database/models/MatchesModel';

type homeAwayGoals = 'homeTeamGoals' | 'awayTeamGoals';

export const goalCount = (matches: MatchesModel[], goaltype: homeAwayGoals) => {
  let totalGoals = 0;
  matches.forEach((match) => {
    totalGoals += match[goaltype];
  });
  return totalGoals;
};

export const getTeamResults = (matches: MatchesModel[], goaltype: homeAwayGoals[]) =>
  matches.reduce(
    (acc, curr) => ({
      victories: acc.victories + (curr[goaltype[0]] > curr[goaltype[1]] ? 1 : 0),
      losses: acc.losses + (curr[goaltype[0]] < curr[goaltype[1]] ? 1 : 0),
      draws: acc.draws + (curr[goaltype[0]] === curr[goaltype[1]] ? 1 : 0),
    }),
    { victories: 0, losses: 0, draws: 0 },
  );

// Para a função getHomeTeamResults calcular o total de vitorias, derrotas e empates, usei o método reduce para iterar sobre cada partida e acumular o numero de VDE em um objeto, ou seja, o objeto inicial { victories: 0, losses: 0, draws: 0 } para o acumulador.

export const totalScore = (matches: MatchesModel[], goaltype: homeAwayGoals[]): number => {
  const { victories, draws } = getTeamResults(matches, goaltype);
  const result = (victories * 3) + draws;
  return result;
};

export const totalScoreGoalsBalance = (
  matches: MatchesModel[],
  goaltype: homeAwayGoals[],
): number => {
  const goalsHome = goalCount(matches, goaltype[0]);
  const goalsAway = goalCount(matches, goaltype[1]);

  const result = goalsHome - goalsAway;
  return result;
};

export const calculateEfficiency = (matche: MatchesModel[], goaltype: homeAwayGoals[]): string => {
  const totalpoints = totalScore(matche, goaltype);
  const totalGames = matche.length;
  const result = (totalpoints / (totalGames * 3)) * 100;
  return result.toFixed(2);
};

export const objectResult = (team: string, matche: MatchesModel[], goaltype:homeAwayGoals[]) => ({
  name: team,
  totalPoints: totalScore(matche, goaltype),
  totalGames: matche.length,
  totalVictories: getTeamResults(matche, goaltype).victories,
  totalDraws: getTeamResults(matche, goaltype).draws,
  totalLosses: getTeamResults(matche, goaltype).losses,
  goalsFavor: goalCount(matche, goaltype[0]),
  goalsOwn: goalCount(matche, goaltype[1]),
  goalsBalance: totalScoreGoalsBalance(matche, goaltype),
  efficiency: calculateEfficiency(matche, goaltype),
});

export const orderResults = (teams: ILeaderboard[]) =>
  teams.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    if (b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;
    if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;
    if (b.goalsFavor !== a.goalsFavor) return b.goalsFavor - a.goalsFavor;
    return a.goalsOwn - b.goalsOwn;
  });
