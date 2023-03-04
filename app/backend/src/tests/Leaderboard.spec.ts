import * as sinon from 'sinon';
import * as chai from 'chai';
import { mockListMatche, mockResult, mockListTeam } from '../tests/mocks/leaderboardMock';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect, request } = chai;

describe('Teste da aplicação: GET /leaderboard/home', () => {
  beforeEach(sinon.restore);
  it('REtorna os times da casa', async () => {
    sinon
      .stub(Model, 'findAll')
      .onFirstCall()
      .resolves(mockListTeam)
      .onSecondCall()
      .resolves(mockListMatche);
    const result = await request(app).get('/leaderboard/home');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal(mockResult);
  });
});