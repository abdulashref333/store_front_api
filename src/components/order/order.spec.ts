import app from '../../../app';
import supertest from 'supertest';
import { truncateDB } from '../../../spec/utils';
import Common from '../../utils/common';
import { IUser } from '../user/user.interfaces';

const ORDER_URL = '/api/orders';
let user: IUser;
let token: string = 'Bearer ';
describe('Orders', function () {
  beforeAll(async () => {
    await truncateDB();
    const resp = await supertest(app).post('/api/users').send({
      firstname: 'test',
      lastname: 'test',
      email: 'test100@test.com',
      password: 'password123',
    });
    user = resp.body.data.user;
    token += resp.body.data.token;
  });
  describe('Testing Create endpoint', function () {
    it('should create an order', async () => {
      const respones1 = await supertest(app).post(ORDER_URL).set('authorization', token).send({
        customer_id: user.id,
        total: 22,
        order_status: 'pending',
        payment_type: 'paypal',
      });
      expect(respones1.statusCode).toBe(201);
    });

    it('should return an error', async () => {
      const respones1 = await supertest(app).post(ORDER_URL).set('authorization', token).send({
        customer_id: user.id,
        order_status: 'pending',
        payment_type: 'paypal',
      });
      expect(respones1.statusCode).toBe(400);
      expect(respones1.text).toContain('is required');
    });
  });

  describe('Testing getOrderById endpoint', function () {
    it('should return an order with id', async () => {
      const respones1 = await supertest(app).post(ORDER_URL).set('authorization', token).send({
        customer_id: user.id,
        total: 22,
        order_status: 'pending',
        payment_type: 'paypal',
      });
      expect(respones1.statusCode).toBe(201);
      const order = respones1.body.data;

      const result = await supertest(app).get(`${ORDER_URL}/${order.id}`).set('authorization', token);
      expect(result.statusCode).toBe(200);
      expect(result.body.data).toEqual(order);
    });
  });

  describe('Testing getAllOrders endpoint', function () {
    beforeEach(async () => {
      await truncateDB('orders');
    });
    it('should return all orders', async () => {
      const respones1 = await supertest(app).post(ORDER_URL).set('authorization', token).send({
        customer_id: user.id,
        total: 22,
        order_status: 'pending',
        payment_type: 'paypal',
      });
      expect(respones1.statusCode).toBe(201);
      const respones2 = await supertest(app).post(ORDER_URL).set('authorization', token).send({
        customer_id: user.id,
        total: 22,
        order_status: 'pending',
        payment_type: 'paypal',
      });
      expect(respones2.statusCode).toBe(201);

      const order1 = respones1.body.data;
      const order2 = respones2.body.data;
      const orders = [order1, order2];

      const result = await supertest(app).get(ORDER_URL).set('authorization', token);

      expect(result.statusCode).toBe(200);
      expect(result.body.data);
    });
  });

  describe('Testing update order endpoint', function () {
    beforeEach(async () => {
      await truncateDB('orders');
    });

    it('should update the order with id', async () => {
      const respones1 = await supertest(app).post(ORDER_URL).set('authorization', token).send({
        customer_id: user.id,
        total: 22,
        order_status: 'pending',
        payment_type: 'paypal',
      });
      expect(respones1.statusCode).toBe(201);

      const order2 = JSON.parse(respones1.text).data;
      const res = await supertest(app)
        .patch(`${ORDER_URL}/${order2.id}`)
        .set('authorization', token)
        .send({ payment_type: 'Master Card' });

      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res.text).data).toEqual({
        id: order2.id,
        customer_id: String(user.id),
        total: parseFloat('22.00').toFixed(2),
        order_status: 'pending',
        payment_type: 'Master Card',
        created_at: order2.created_at,
      });
    });
  });

  describe('Testing delete order endpoint', function () {
    beforeEach(async () => {
      await truncateDB('orders');
    });

    it('should delete the order with id', async () => {
      const respones1 = await supertest(app).post(ORDER_URL).set('authorization', token).send({
        customer_id: user.id,
        total: 22,
        order_status: 'pending',
        payment_type: 'paypal',
      });
      expect(respones1.statusCode).toBe(201);

      const order2 = JSON.parse(respones1.text).data;

      const res = await supertest(app).delete(`${ORDER_URL}/${order2.id}`).set('authorization', token);
      expect(res.statusCode).toBe(200);
    });
  });

  describe('Testing addProduct endpoint', function () {
    beforeEach(async () => {
      await truncateDB('orders');
    });

    it('should add product ', async () => {
      const respones1 = await supertest(app).post(ORDER_URL).set('authorization', token).send({
        customer_id: user.id,
        total: 22,
        order_status: 'pending',
        payment_type: 'paypal',
      });
      expect(respones1.statusCode).toBe(201);

      const respones2 = await supertest(app).post('/api/products').set('authorization', token).send({
        title: 'test product',
        summary: 'nice test product',
        price: 22.4,
        image_url: 'example.com',
      });
      expect(respones1.statusCode).toBe(201);

      const order = JSON.parse(respones1.text).data;
      const product = JSON.parse(respones2.text).data;

      const res = await supertest(app)
        .post(`${ORDER_URL}/${order.id}/products/${product.id}`)
        .set('authorization', token)
        .send({ quantity: 22 });
      expect(res.statusCode).toBe(201);
    });
  });

  describe('Testing addProducts endpoint', function () {
    beforeEach(async () => {
      await truncateDB('orders');
    });

    it('should add products ', async () => {
      const respones1 = await supertest(app).post(ORDER_URL).set('authorization', token).send({
        customer_id: user.id,
        total: 22,
        order_status: 'pending',
        payment_type: 'paypal',
      });
      expect(respones1.statusCode).toBe(201);

      const respones2 = await supertest(app).post('/api/products').set('authorization', token).send({
        title: 'test product',
        summary: 'nice test product',
        price: 22.4,
        image_url: 'example.com',
      });
      expect(respones2.statusCode).toBe(201);

      const respones3 = await supertest(app).post('/api/products').set('authorization', token).send({
        title: 'test2 product',
        summary: 'nice test2 product',
        price: 223.4,
        image_url: 'example2.com',
      });
      expect(respones3.statusCode).toBe(201);
      const order = JSON.parse(respones1.text).data;
      const product1 = JSON.parse(respones2.text).data;
      const product2 = JSON.parse(respones3.text).data;

      const res = await supertest(app)
        .post(`${ORDER_URL}/${order.id}/products`)
        .set('authorization', token)
        .send({
          products: [
            { product_id: product1.id, quantity: 3 },
            { product_id: product2.id, quantity: 5 },
          ],
        });
      expect(res.statusCode).toBe(201);
    });
  });
});

/*

this a template for writing test suites.

it('should __ an order', async function(){
  // your test code here.
});

*/
