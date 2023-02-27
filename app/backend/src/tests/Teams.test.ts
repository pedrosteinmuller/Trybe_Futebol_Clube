import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(TeamsModel, "findOne")
      .resolves({
        id: 1,
        teamName: 'Avaí/Kindermann',
      } as TeamsModel);
  });

  after(()=>{
    (TeamsModel.findOne as sinon.SinonStub).restore();
  })

  it('Testa o método getAll da rota teams', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/teams')
    expect(chaiHttpResponse.status).to.be.deep.equal(200);
  });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
