import app from '../../../app';
import supertest from 'supertest';
import { truncateDB } from '../../../spec/utils';
import { IUser } from './user.interfaces';

let user: IUser;
let token: string = 'Bearer ';
const LOGIN_URL = '/api/users/login';

describe('[E2E] User', function () {
  it('should create a user', async () => {
    await truncateDB();
    await supertest(app)
      .post('/api/users')
      .send({
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: '12345678',
      })
      .expect((u) => {
        expect(u.status).toBe(201);
        user = u.body.data.user;
        token += u.body.data.token;
      });
  });
  it('returns 400 if an account existed with the same email address', async () => {
    // status code should be 400
    await supertest(app)
      .post('/api/users')
      .send({
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: '12345678',
      })
      .expect((u) => {
        expect(u.status).toBe(400);
      });
  });

  it('should responed with the profile data', async () => {
    await supertest(app)
      .get('/api/users/me')
      .set('authorization', token)
      .expect((u) => {
        expect(u.status).toBe(200);
      });
  });

  // Faluire story
  it('should responed with 401 ', async () => {
    await supertest(app)
      .get('/api/users/me')
      .expect((u) => {
        expect(u.status).toBe(401);
      });
  });

  it('should return the user with id', async () => {
    await supertest(app)
      .get(`/api/users/${user.id}`)
      .set('authorization', token)
      .expect((u) => {
        const user2 = u.body.data.user;
        const copiedUser = { ...user2, password: user.password };
        expect(u.status).toBe(200);
        expect(copiedUser).toEqual(user);
      });
  });
  // Success scenarios

  it('should successed in login', async () => {
    const respons2 = await supertest(app).post(LOGIN_URL).send({
      email: 'test@test.com',
      password: '12345678',
    });
    expect(respons2.statusCode).toBe(200);
    expect(respons2.text).toContain('user');
    expect(respons2.text).toContain('token');
  });

  // Failuer scenarios

  it('should fail with error pass or email', async () => {
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
  });

  it('should fail without email or password', async () => {
    const respons2 = await supertest(app).post(LOGIN_URL).send({
      password: '123456',
    });
    expect(respons2.statusCode).toBe(400);
    expect(respons2.body[0].message).toEqual('"email" is required');

    const respons3 = await supertest(app).post(LOGIN_URL).send({
      email: 'test@test.com',
    });
    expect(respons3.statusCode).toBe(400);
    expect(respons3.body[0].message).toEqual('"password" is required');
  });
});
