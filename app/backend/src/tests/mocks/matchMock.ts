import MatchesModel from "../../database/models/MatchesModel";

const mockMatch = [
  new MatchesModel({
    id: 1,
    homeTeamId: 13,
    homeTeamGoals: 1,
    awayTeamId: 2,
    awayTeamGoals: 1,
    inProgress: true,
  }),
  new MatchesModel({
    id: 2,
    homeTeamId: 10,
    homeTeamGoals: 1,
    awayTeamId: 5,
    awayTeamGoals: 3,
    inProgress: false,
  }),
]

const mockInProgress = [
  {
    id: 1,
    homeTeamId: 13,
    homeTeamGoals: 1,
    awayTeamId: 2,
    awayTeamGoals: 1,
    inProgress: true,
  },
  {
    id: 2,
    homeTeamId: 10,
    homeTeamGoals: 1,
    awayTeamId: 5,
    awayTeamGoals: 3,
    inProgress: false,
  },
];

const createMatche = {
  homeTeamId: 1,
  homeTeamGoals: 1,
  awayTeamId: 1,
  awayTeamGoals: 1,
  inProgress: true,
};

export { mockMatch, mockInProgress, createMatche }