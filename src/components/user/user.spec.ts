import app from '../../../app';
import supertest from 'supertest';
import { truncateDB } from '../../../spec/utils';
import { JWT } from '../../utils/jwt';

describe('[E2E] User', function () {
  describe('Testing the signup endpoint', function () {
    beforeEach(async () => {
      await truncateDB();
    });

    // Success scenarios
    it('creates an account', async function () {
      // status code should be 201 `Created`
      const response = await supertest(app).post('/api/users').send({
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: '123456',
      });
      expect(response.statusCode).toBe(201);
    });

    // Failure scenarios
    it('returns 400 if an account existed with the same email address', async function () {
      // status code should be 201 `Created`
      const createUser1Response = await supertest(app).post('/api/users').send({
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: '123456',
      });
      expect(createUser1Response.statusCode).toBe(201);

      // status code should be 400
      const createUser2Response = await supertest(app).post('/api/users').send({
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: '123456',
      });
      expect(createUser2Response.statusCode).toBe(400);
    });
  });
  describe('Testing the me endpoint ', function () {
    beforeEach(async () => {
      await truncateDB();
    });
    // Success scenarios
    it('should responed with the profile data', async function () {
      // status code should be 201 `Created`
      const createUser1Response = await supertest(app).post('/api/users').send({
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: '123456',
      });
      expect(createUser1Response.statusCode).toBe(201);

      const token = JSON.parse(createUser1Response.text).data.token;

      const createUser2Response = await supertest(app)
        .get('/api/users/me')
        .set('authorization', 'Bearer ' + token)
        .send({
          firstname: 'test',
          lastname: 'test',
          email: 'test@test.com',
          password: '123456',
        });
      expect(createUser2Response.statusCode).toBe(200);
    });

    // Faluire story
    it('should responed with 401 ', async function () {
      const createUser2Response = await supertest(app).get('/api/users/me').send({
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: '123456',
      });
      expect(createUser2Response.statusCode).toBe(401);
    });
  });
  describe('Testing the getUser endpoint', function () {
    beforeEach(async () => {
      await truncateDB();
    });
    // Success scenarios
    it('should return the created user', async function () {
      // status code should be 201 `Created`
      const response1 = await supertest(app).post('/api/users').send({
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: '123456',
      });
      expect(response1.statusCode).toBe(201);

      const data = JSON.parse(response1.text).data;
      delete data.user.password;

      const response2 = await supertest(app)
        .get(`/api/users/${data.user.id}`)
        .set('authorization', 'Bearer ' + data.token);
      const user2 = JSON.parse(response2.text).data.user;

      expect(user2).toEqual(data.user);
    });
  });
});
