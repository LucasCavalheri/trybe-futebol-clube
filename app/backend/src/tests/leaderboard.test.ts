import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;

const LEADERBOARD_URL = '/leaderboard';

import { app } from '../app';

import Match from '../database/models/match.model';
import Team from '../database/models/team.model';
import { leaderBoardMock, teamMock } from './mocks';
import HttpStatus from '../api/utils/http-status.enum';

describe('leaderboard integration tests', function () {
  this.afterEach(() => sinon.restore());

  describe('findAll', function () {
    it('should return home', async function() {
      sinon.stub(Team, 'findAll').resolves(teamMock.allTeams);
      sinon.stub(Match, 'findAll').resolves(leaderBoardMock.matchList);

      const response = await chai.request(app).get(`${LEADERBOARD_URL}/home`);

      expect(response.body).to.deep.equal(leaderBoardMock.home);
      expect(response.status).to.equal(HttpStatus.OK);
    });
  });
});
