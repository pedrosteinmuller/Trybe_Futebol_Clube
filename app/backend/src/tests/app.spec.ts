import { expect } from 'chai';
import { App } from '../app';
import * as sinon from 'sinon';
import * as http from 'http';

describe('Testando o App', () => {
  describe('Método Start', () => {
    let app: App;
    let consoleSpy: sinon.SinonSpy;
    let listenStub: sinon.SinonStub;

    beforeEach(() => {
      app = new App();
      consoleSpy = sinon.spy(console, 'log');
      listenStub = sinon.stub(http.Server.prototype, 'listen');
    });

    afterEach(() => {
      consoleSpy.restore();
      listenStub.restore();
    });

    it('Deve startar o servidor', () => {
      const PORT = 3000;
      app.start(PORT);

      sinon.assert.calledOnce(listenStub);
      sinon.assert.calledWith(listenStub, PORT);
    });
  });
});
