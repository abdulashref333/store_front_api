import app from '../../../app';
import supertest from 'supertest';
import { truncateDB } from '../../../spec/utils';

describe('Product', function () {
  describe('Testing getAllProducts endpoint', function () {
    beforeEach(async () => {
      await truncateDB();
    });

    //Success Scenarios
    it('should return all products array', async function () {
      const respones1 = await supertest(app).post('/api/products').send({
        title: 'test product',
        summary: 'nice test product',
        price: 22.4,
        image_url: 'example.com',
      });
      expect(respones1.statusCode).toBe(201);

      const prodcuts = JSON.parse(respones1.text).data;

      const respones2 = await supertest(app).get('/api/products');
      expect(JSON.parse(respones2.text).data).toEqual([prodcuts]);
    });
  });
  describe('Testing createproduct endpiont ', function () {
    it('should create a product', async function () {
      const respones1 = await supertest(app).post('/api/products').send({
        title: 'test product',
        summary: 'nice test product',
        price: 22.4,
        image_url: 'example.com',
      });
      expect(respones1.statusCode).toBe(201);
    });
  });
  describe('Testing getProductById endpoint', function () {
    beforeEach(async () => {
      await truncateDB();
    });

    //Success Scenarios
    it('should return the product', async function () {
      const respones1 = await supertest(app).post('/api/products').send({
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
    });
  });
});
