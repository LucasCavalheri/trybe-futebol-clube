import * as sinon from 'sinon';
import * as chai from 'chai';

import { App } from '../app';

const { expect } = chai;

describe('server', () => {
  describe('start', () => {
    it('should start the app on the given port', () => {
      const app = new App();
      const startStub = sinon.stub(app, 'start');
      const PORT = 3000;
      app.start(PORT);
      expect(startStub.calledOnceWith(PORT)).to.be.true;
      startStub.restore();
    });
  });
});
