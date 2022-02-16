import app from '../../../app';
import supertest from 'supertest';
import { truncateDB } from '../../../spec/utils';

describe('[E2E] User', function () {
  beforeAll(async (done) => {
    await truncateDB();
    done();
  });
  describe('Testing the signup endpoint', function () {
    beforeEach(async (done) => {
      await truncateDB();
      done();
    });
    // Success scenarios
    it('creates an account', async (done) => {
      // status code should be 201 `Created`
      const response = await supertest(app).post('/api/users').send({
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: '12345678',
      });
      expect(response.statusCode).toBe(201);
      done();
    }, 10000);

    // Failure scenarios
    it('returns 400 if an account existed with the same email address', async (done) => {
      // status code should be 201 `Created`
      const createUser1Response = await supertest(app).post('/api/users').send({
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: '12345678',
      });
      expect(createUser1Response.statusCode).toBe(201);

      // status code should be 400
      const createUser2Response = await supertest(app).post('/api/users').send({
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: '12345678',
      });
      expect(createUser2Response.statusCode).toBe(400);
      done();
    }, 10000);
  });
  describe('Testing the me endpoint ', function () {
    beforeEach(async (done) => {
      await truncateDB();
      done();
    });
    // Success scenarios
    it('should responed with the profile data', async (done) => {
      // status code should be 201 `Created`
      const createUser1Response = await supertest(app).post('/api/users').send({
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: '12345678',
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
          password: '12345678',
        });
      expect(createUser2Response.statusCode).toBe(200);
      done();
    });

    // Faluire story
    it('should responed with 401 ', async (done) => {
      const createUser2Response = await supertest(app).get('/api/users/me').send({
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: '12345678',
      });
      expect(createUser2Response.statusCode).toBe(401);
      done();
    });
  });
  describe('Testing the getUser endpoint', function () {
    beforeEach(async (done) => {
      await truncateDB();
      done();
    });
    // Success scenarios
    it('should return the created user', async (done) => {
      // status code should be 201 `Created`
      const response1 = await supertest(app).post('/api/users').send({
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: '12345678',
      });
      expect(response1.statusCode).toBe(201);

      const data = JSON.parse(response1.text).data;
      delete data.user.password;

      const response2 = await supertest(app)
        .get(`/api/users/${data.user.id}`)
        .set('authorization', 'Bearer ' + data.token);
      const user2 = JSON.parse(response2.text).data.user;

      expect(user2).toEqual(data.user);
      done();
    });
  });
  describe('Testing Login endpoint', function () {
    beforeEach(async (done) => {
      await truncateDB();
      done();
    });
    const LOGIN_URL = '/api/users/login';
    // Success scenarios

    it('should successed in login', async (done) => {
      const respons1 = await supertest(app).post('/api/users').send({
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: '12345678',
      });
      expect(respons1.statusCode).toBe(201);

      const respons2 = await supertest(app).post(LOGIN_URL).send({
        email: 'test@test.com',
        password: '12345678',
      });
      expect(respons2.statusCode).toBe(200);
      expect(respons2.text).toContain('user');
      expect(respons2.text).toContain('token');
      done();
    });

    // Failuer scenarios

    it('should fail with error pass or email', async (done) => {
      const respons1 = await supertest(app).post('/api/users').send({
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: '12345678',
      });
      expect(respons1.statusCode).toBe(201);

      // login with invalid password.
      const respons2 = await supertest(app).post(LOGIN_URL).send({
        email: 'test@test.com',
        password: '12345678ee',
      });
      expect(respons2.statusCode).toBe(400);
      expect(respons2.text).toContain('Invalid Credentials!');

      // login with Invalid email @test.com
      const respons3 = await supertest(app).post(LOGIN_URL).send({
        email: 'test22@test.com',
        password: '12345678',
      });
      expect(respons3.statusCode).toBe(400);
      expect(respons3.text).toContain('Invalid Credentials!');
      done();
    });

    // it('should fail without email or password', async function () {
    //   const respons1 = await supertest(app).post('/api/users').send({
    //     firstname: 'test',
    //     lastname: 'test',
    //     email: 'test@test.com',
    //     password: '123456',
    //   });
    //   expect(respons1.statusCode).toBe(201);

    //   const respons2 = await supertest(app).post(LOGIN_URL).send({
    //     password: '123456',
    //   });
    //   expect(respons2.statusCode).toBe(400);
    //   expect(respons2.text).toContain('Missing Password or Email');

    //   const respons3 = await supertest(app).post(LOGIN_URL).send({
    //     email: 'test@test.com',
    //   });
    //   expect(respons3.statusCode).toBe(400);
    //   expect(respons3.text).toContain('Missing Password or Email');
    // });
  });
});
