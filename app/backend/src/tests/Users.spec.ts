import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UsersModel from '../database/models/UsersModel'

// import { Response } from 'superagent';

import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /login', () => {

  // let chaiHttpResponse: Response;
  beforeEach(sinon.restore);

  const userMock = [
    new UsersModel({
      id: 1,
      username: "Pedro",
      role: "admin",
      password: "123coxinha",
      email: "admin@admin.com",
    })
  ]

  const loginCorrect = {
    email: "admin@admin.com",
    password: "123coxinha"
  }

  const noPassword = {
    email: "admin@admin.com",
    password: '',
  }

  const noEmail = {
    password: "aleatorio",
    email: '',
  }

  // beforeEach(async () => {
  //   sinon
  //     .stub(UsersModel, "findOne")
  //     .resolves(userMock as UsersModel);

  //   // sinon.stub(bcrypt, 'compareSync').resolves(true);
  // });

  // afterEach(() => {
  //   (UsersModel.findOne as sinon.SinonStub).restore();
  // })

  it('Verifica que o email vazio, retorna uma mensagem de erro e status 400', async () => {
    sinon.stub(Model, 'findAll').resolves(userMock);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const result = await chai.request(app).post('/login').send(noEmail);
    expect(result.status).to.be.equal(400);
    expect(result.body).to.deep.equal({ message: 'All fields must be filled'});
  });

  // it('Verifica que o password vazio, retorna uma mensagem de erro e status 400', async () => {
  //   chaiHttpResponse = await chai
  //     .request(app).post('/login').send(noPassword);
  //   expect(chaiHttpResponse.status).to.be.equal(400);
  //   expect(chaiHttpResponse.body.message).to.deep.equal('All fields must be filled');
  // });

  // it('Verifica caso de sucesso com email e senha corretos', async () => {
  //   chaiHttpResponse = await chai
  //     .request(app).post('/login').send(loginCorrect);
  //   expect(chaiHttpResponse.status).to.be.equal(200);
  //   expect(chaiHttpResponse.body).not.to.be.empty;
  //   expect(chaiHttpResponse.body).to.be.an('object');
  // });
});
