import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Model } from 'sequelize';
import { allTeams, oneTeam } from './mocks/team.mock';
import HttpStatus from '../api/utils/http-status.enum';
import ErrorMessage from '../api/utils/error-messages.enum';

chai.use(chaiHttp);

const { expect } = chai;

const TEAM_ROUTE = '/teams';
const TEAM_ROUTE_WITH_ID = '/teams/16';
const TEAM_ROUTE_WITH_INVALID_ID = '/teams/99999';

describe('teams integration tests', () => {
  afterEach(() => sinon.restore());

  describe('findAll', () => {
    it('should return all teams', async function () {
      sinon.stub(Model, 'findAll').resolves(allTeams);

      const response = await chai.request(app).get(TEAM_ROUTE).send();

      expect(response.body).to.deep.equal(allTeams);
      expect(response.status).to.equal(HttpStatus.OK);
    });
  });

  describe('findByPk', () => {
    it('should return one team', async function () {
      sinon.stub(Model, 'findByPk').resolves(oneTeam);

      const response = await chai.request(app).get(TEAM_ROUTE_WITH_ID).send();

      expect(response.body).to.deep.equal(oneTeam);
      expect(response.status).to.equal(HttpStatus.OK);
    });

    it('should return 404 and message "team not found"', async function () {
      sinon.stub(Model, 'findByPk').resolves(null);

      const response = await chai
        .request(app)
        .get(TEAM_ROUTE_WITH_INVALID_ID)
        .send();

      expect(response.body).to.deep.equal({
        message: ErrorMessage.TEAM_NOT_FOUND,
      });
      expect(response.status).to.equal(HttpStatus.NOT_FOUND);
    });
  });
});
