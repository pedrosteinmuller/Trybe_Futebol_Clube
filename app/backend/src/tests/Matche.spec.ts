import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'sequelize';

import { app } from '../app';

import { Response } from 'superagent';
import { mockMatch, mockInProgress, createMatche } from './mocks/matchMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /matches', () => {
  beforeEach(sinon.restore);
  let chaiHttpResponse: Response;

  it('Testa o método getAll da rota matches', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/matches').send(mockMatch);
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Verifica as partidas em andamento (true)', async () => {
    sinon.stub(Model, 'findAll').resolves(mockMatch);

    const result = await chai.request(app).get('/matches?inProgress=true');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal([mockInProgress[0]]);
  });

  it('Verifica as partidas finalizadas (false)', async () => {
    sinon.stub(Model, 'findAll').resolves(mockMatch);

    const result = await chai.request(app).get('/matches?inProgress=false');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal([mockInProgress[1]]);
 })

 it('Verifica finish do match quando utilizado um token válido', async () => {
  sinon.stub(Model, 'update').resolves();
  // utilizei o método set após o patch para simular o token, passando o auth e o valor do token.
  const result = await chai
    .request(app)
    .patch('/matches/1/finish')
    .set(
      'Authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsInVzZXJuYW1lIjoiQWRtaW4ifSwiaWF0IjoxNjc3NTkxODEwLCJleHAiOjE2Nzg0NTU4MTB9.49swV3jOhW_qumAUVQBQqRpTUsJkD1JMqeXxoV8VZmI',
    );

  expect(result.status).to.be.equal(200);
  expect(result.body).to.deep.equal({ message: 'Finished' });
});

it('Verifica o update do match quando utilizado um token válido', async () => {
  sinon.stub(Model, 'update').resolves();

  const result = await chai
    .request(app)
    .patch('/matches/1')
    .send({
      homeTeamGoals: 10,
      awayTeamGoals: 20,
    })
    .set(
      'Authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsInVzZXJuYW1lIjoiQWRtaW4ifSwiaWF0IjoxNjc3NTkxODEwLCJleHAiOjE2Nzg0NTU4MTB9.49swV3jOhW_qumAUVQBQqRpTUsJkD1JMqeXxoV8VZmI',
    );

  expect(result.status).to.be.equal(200);
  expect(result.body).to.deep.equal({ message: 'Updated' });
});

it('Verifica a criacao de uma match quando utilizado um token válido', async () => {
  sinon.stub(Model, 'create').resolves(mockMatch[0]);

  const result = await chai
    .request(app)
    .post('/matches')
    .send(createMatche)
    .set(
      'Authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsInVzZXJuYW1lIjoiQWRtaW4ifSwiaWF0IjoxNjc3NTkxODEwLCJleHAiOjE2Nzg0NTU4MTB9.49swV3jOhW_qumAUVQBQqRpTUsJkD1JMqeXxoV8VZmI',
    );

  expect(result.status).to.be.equal(201);
  expect(result.body).to.deep.equal(mockInProgress[0]);
});
})