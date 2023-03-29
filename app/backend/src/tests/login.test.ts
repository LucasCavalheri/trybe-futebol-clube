import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;

import { loginMock } from './mocks/';

import { app } from '../app';
import HttpStatus from '../api/utils/http-status.enum';
import ErrorMessage from '../api/utils/error-messages.enum';
import { Model } from 'sequelize';

const LOGIN_ROUTE = '/login';

describe('login integration tests', function () {
  afterEach(() => sinon.restore());

  describe('login', function () {
    it('should fail if email is not provided', async function () {
      const response = await chai
        .request(app)
        .post(LOGIN_ROUTE)
        .send(loginMock.loginWithoutEmail);

      expect(response.body).to.deep.equal({
        message: ErrorMessage.EMPTY_FIELDS,
      });
      expect(response.status).to.equal(HttpStatus.BAD_REQUEST);
    });

    it('should fail if password is not provided', async function () {
      const response = await chai
        .request(app)
        .post(LOGIN_ROUTE)
        .send(loginMock.loginWithoutPassword);

      expect(response.body).to.deep.equal({
        message: ErrorMessage.EMPTY_FIELDS,
      });
      expect(response.status).to.equal(HttpStatus.BAD_REQUEST);
    });

    it('should fail if provided email are in incorrect format', async function () {
      const response = await chai
        .request(app)
        .post(LOGIN_ROUTE)
        .send(loginMock.loginWithIncorrectEmailFormat);

      expect(response.body).to.deep.equal({
        message: ErrorMessage.INVALID_EMAIL_OR_PASSWORD,
      });
      expect(response.status).to.equal(HttpStatus.UNAUTHORIZED);
    });

    it('should fail if provided password are in incorrect format', async function () {
      const response = await chai
        .request(app)
        .post(LOGIN_ROUTE)
        .send(loginMock.loginWithIncorrectPasswordFormat);

      expect(response.body).to.deep.equal({
        message: ErrorMessage.INVALID_EMAIL_OR_PASSWORD,
      });
      expect(response.status).to.equal(HttpStatus.UNAUTHORIZED);
    });

    it('should fail if email does not exists on db', async function () {
      sinon.stub(Model, 'findOne').resolves(null);

      const response = await chai
        .request(app)
        .post(LOGIN_ROUTE)
        .send(loginMock.loginWithNonExistentEmail);

      expect(response.body).to.deep.equal({
        message: ErrorMessage.INVALID_EMAIL_OR_PASSWORD,
      });
      expect(response.status).to.equal(HttpStatus.UNAUTHORIZED);
    });

    it('should fail if password doest not exists on db', async function () {
      sinon.stub(Model, 'findOne').resolves(null);

      const response = await chai
        .request(app)
        .post(LOGIN_ROUTE)
        .send(loginMock.loginWithNonExistentPassword);

      expect(response.body).to.deep.equal({
        message: ErrorMessage.INVALID_EMAIL_OR_PASSWORD,
      });
      expect(response.status).to.equal(HttpStatus.UNAUTHORIZED);
    });

    it('should succeed on login', async function () {
      const response = await chai.request(app).post(LOGIN_ROUTE).send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

      expect(response.status).to.deep.equal(HttpStatus.OK);
    });

    it('should fail if token is not provided', async function () {
      const response = await chai
        .request(app)
        .get(`${LOGIN_ROUTE}/role`)
        .set('Authorization', '');

      expect(response.body).to.deep.equal({
        message: ErrorMessage.TOKEN_NOT_FOUND,
      });
      expect(response.status).to.equal(HttpStatus.UNAUTHORIZED);
    });

    it('should fail if token is invalid', async function () {
      const response = await chai
        .request(app)
        .get(`${LOGIN_ROUTE}/role`)
        .set('Authorization', loginMock.invalidToken);

      expect(response.body).to.deep.equal({
        message: ErrorMessage.TOKEN_NOT_VALID,
      });
      expect(response.status).to.equal(HttpStatus.UNAUTHORIZED);
    });

    it('should return role', async function () {
      sinon.stub(Model, 'findOne').resolves(loginMock.user);
      sinon.stub(jwt, 'verify').resolves(loginMock.user);

      const response = await chai
        .request(app)
        .get(`${LOGIN_ROUTE}/role`)
        .set('Authorization', loginMock.validToken);

      expect(response.body).to.deep.equal({ role: loginMock.user.role });
      expect(response.status).to.equal(HttpStatus.OK);
    });
  });
});
