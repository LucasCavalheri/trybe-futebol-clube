import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const MATCH_ROUTE = '/matches';
const FINISHED_MESSAGE = 'Finished';
const FINISHED_IN_PROGRESS_MATCH = 'Match Finished';

import { app } from '../app';
import { Model } from 'sequelize';

import { loginMock, matchMock } from './mocks';
import HttpStatus from '../api/utils/http-status.enum';
import ErrorMessage from '../api/utils/error-messages.enum';

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

    it('should be able to finish a inProgress match', async function () {
      sinon.stub(Model, 'update').resolves([1]);

      const response = await chai
        .request(app)
        .patch(`${MATCH_ROUTE}/1`)
        .send(matchMock.matchGoals)
        .set('Authorization', loginMock.validToken);

      expect(response.body).to.deep.equal({
        message: FINISHED_IN_PROGRESS_MATCH,
      });
    });
  });

  describe('createMatch', function () {
    it('should be able to create a new match on db', async function () {
      sinon.stub(Model, 'create').resolves(matchMock.newMatch);

      const response = await chai
        .request(app)
        .post(MATCH_ROUTE)
        .send(matchMock.matchReqBody)
        .set('Authorization', loginMock.validToken);

      expect(response.body).to.deep.equal(matchMock.newMatch);
      expect(response.status).to.equal(HttpStatus.CREATED);
    });

    it('should return error if create match with both teams being equal', async function () {
      const response = await chai
        .request(app)
        .post(MATCH_ROUTE)
        .send(matchMock.matchWithSameTeam)
        .set('Authorization', loginMock.validToken);

      expect(response.body).to.deep.equal({
        message: ErrorMessage.EQUAL_TEAMS,
      });
      expect(response.status).to.equal(HttpStatus.UNPROCESSABLE_CONTENT);
    });

    it('should not be possible to create a match with team that doest not exists', async function () {
      const response = await chai
        .request(app)
        .post(MATCH_ROUTE)
        .send(matchMock.matchWithNonExistentTeams)
        .set('Authorization', loginMock.validToken);

      expect(response.body).to.deep.equal({
        message: ErrorMessage.TEAM_NOT_FOUND,
      });
      expect(response.status).to.equal(HttpStatus.NOT_FOUND);
    });
  });
});
