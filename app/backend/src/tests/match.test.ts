import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const MATCH_ROUTE = '/matches';
const FINISHED_MESSAGE = 'Finished';

import { app } from '../app';
import { Model } from 'sequelize';

import { loginMock, matchMock } from './mocks';
import HttpStatus from '../api/utils/http-status.enum';

describe('matches integration tests', function () {
  this.afterEach(() => sinon.restore());

  describe('findAll', function () {
    it('should return all matches', async function () {
      sinon.stub(Model, 'findAll').resolves(matchMock.matches);

      const response = await chai.request(app).get(MATCH_ROUTE).send();

      expect(response.body).to.deep.equal(matchMock.matches);
      expect(response.status).to.equal(HttpStatus.OK);
    });

    it('shoud return all inProgress matches', async function () {
      sinon.stub(Model, 'findAll').resolves(matchMock.inProgressMatches);

      const response = await chai
        .request(app)
        .get(`${MATCH_ROUTE}?inProgress=true`)
        .send();

      expect(response.body).to.deep.equal(matchMock.inProgressMatches);
      expect(response.status).to.equal(HttpStatus.OK);
    });

    it('shoud return all finished matches', async function () {
      sinon.stub(Model, 'findAll').resolves(matchMock.finishedMatches);

      const response = await chai
        .request(app)
        .get(`${MATCH_ROUTE}?inProgress=false`)
        .send();

      expect(response.body).to.deep.equal(matchMock.finishedMatches);
      expect(response.status).to.equal(HttpStatus.OK);
    });
  });

  describe('finishMatch', function () {
    it('should be able to finish a match', async function () {
      sinon.stub(Model, 'update').resolves([1]);

      const response = await chai
        .request(app)
        .patch(`${MATCH_ROUTE}/1/finish`)
        .set('Authorization', loginMock.validToken);

      expect(response.body).to.deep.equal({ message: FINISHED_MESSAGE });
      expect(response.status).to.equal(HttpStatus.OK);
    });
  });
});
