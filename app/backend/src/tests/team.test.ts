import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Model } from 'sequelize';
import { allTeams, oneTeam } from './mocks/team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('/teams integration tests', () => {
  afterEach(() => sinon.restore());

  describe('findAll', () => {
    it('should return all teams', async function () {
      sinon.stub(Model, 'findAll').resolves(allTeams);

      const response = await chai.request(app).get('/teams').send();

      expect(response.body).to.deep.equal(allTeams);
      expect(response.status).to.equal(200);
    });
  });

  describe('findByPk', () => {
    it('should return one team', async function () {
      sinon.stub(Model, 'findByPk').resolves(oneTeam);

      const response = await chai.request(app).get('/teams/16').send();

      expect(response.body).to.deep.equal(oneTeam);
      expect(response.status).to.equal(200);
    })
  })
});
