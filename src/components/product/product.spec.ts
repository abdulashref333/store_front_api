import app from '../../../app';
import supertest from 'supertest';
import { truncateDB } from '../../../spec/utils';
import { IUser } from '../user/user.interfaces';

let user: IUser;
let token: string = 'Bearer ';
describe('Product', function () {
  beforeAll(async (done) => {
    await truncateDB();
    const resp = await supertest(app).post('/api/users').send({
      firstname: 'test',
      lastname: 'test',
      email: 'test100@test.com',
      password: 'password123',
    });

    user = resp.body.data.user;
    token += resp.body.data.token;
    done();
  });
  describe('Testing getAllProducts endpoint', function () {
    //Success Scenarios
    it('should return all products array', async (done) => {
      const respones1 = await supertest(app).post('/api/products').set('authorization', token).send({
        title: 'test product',
        summary: 'nice test product',
        price: 22.4,
        image_url: 'example.com',
      });
      expect(respones1.statusCode).toBe(201);

      const prodcuts = JSON.parse(respones1.text).data;

      const respones2 = await supertest(app).get('/api/products');
      expect(JSON.parse(respones2.text).data).toEqual([prodcuts]);
      done();
    });
  });
  describe('Testing createproduct endpiont ', function () {
    it('should create a product', async (done) => {
      const respones1 = await supertest(app).post('/api/products').set('authorization', token).send({
        title: 'test product',
        summary: 'nice test product',
        price: 22.4,
        image_url: 'example.com',
      });
      expect(respones1.statusCode).toBe(201);
      done();
    });
  });
  describe('Testing getProductById endpoint', function () {
    //Success Scenarios
    it('should return the product', async (done) => {
      const respones1 = await supertest(app).post('/api/products').set('authorization', token).send({
        title: 'test product',
        summary: 'nice test product',
        price: 22.4,
        image_url: 'example.com',
      });
      expect(respones1.statusCode).toBe(201);

      const prodcut = JSON.parse(respones1.text).data;

      const respones2 = await supertest(app).get(`/api/products/${prodcut.id}`);
      expect(respones2.statusCode).toBe(200);
      expect(JSON.parse(respones2.text).data).toEqual(prodcut);
      done();
    });
  });
});
