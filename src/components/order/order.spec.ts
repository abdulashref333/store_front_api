import app from '../../../app';
import supertest from 'supertest';
import { truncateDB } from '../../../spec/utils';
import Common from '../../utils/common';
import { IUser } from '../user/user.interfaces';

const ORDER_URL = '/api/orders';
let user: IUser;

fdescribe('Orders', function () {
  describe('Testing Create endpoint', function () {
    beforeEach(async () => {
      await truncateDB();
      const res = await Common.dbInsert('users', {
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: 'password123',
      });
      user = res ? res[0] : {};
    });

    it('should create an order', async function () {
      const respones1 = await supertest(app).post(ORDER_URL).send({
        customer_id: user.id,
        total: 22,
        order_status: 'pending',
        payment_type: 'paypal',
      });
      expect(respones1.statusCode).toBe(201);
    });

    it('should return an error', async function () {
      const respones1 = await supertest(app).post(ORDER_URL).send({
        customer_id: user.id,
        order_status: 'pending',
        payment_type: 'paypal',
      });
      expect(respones1.statusCode).toBe(400);
      expect(respones1.text).toContain('Something went wrong');
    });
  });

  describe('Testing getOrderById endpoint', function () {
    beforeEach(async () => {
      await truncateDB();
      const userRes = await Common.dbInsert('users', {
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: 'password123',
      });
      user = userRes ? userRes[0] : {};
    });

    it('should return an order with id', async function () {
      const respones1 = await supertest(app).post(ORDER_URL).send({
        customer_id: user.id,
        total: 22,
        order_status: 'pending',
        payment_type: 'paypal',
      });
      expect(respones1.statusCode).toBe(201);
      const order = JSON.parse(respones1.text).data;

      const result = await supertest(app).get(`${ORDER_URL}/${order.id}`);
      expect(result.statusCode).toBe(200);
      expect(JSON.parse(result.text).data).toEqual(order);
    });
  });

  describe('Testing getAllOrders endpoint', function () {
    beforeEach(async () => {
      await truncateDB();
      const userRes = await Common.dbInsert('users', {
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: 'password123',
      });
      user = userRes ? userRes[0] : {};
    });

    it('should return all orders', async function () {
      const respones1 = await supertest(app).post(ORDER_URL).send({
        customer_id: user.id,
        total: 22,
        order_status: 'pending',
        payment_type: 'paypal',
      });
      expect(respones1.statusCode).toBe(201);
      const respones2 = await supertest(app).post(ORDER_URL).send({
        customer_id: user.id,
        total: 22,
        order_status: 'pending',
        payment_type: 'paypal',
      });
      expect(respones2.statusCode).toBe(201);

      const order1 = JSON.parse(respones1.text).data;
      const order2 = JSON.parse(respones2.text).data;
      const orders = [order1, order2];

      const result = await supertest(app).get(ORDER_URL);

      expect(JSON.parse(result.text).data).toEqual(orders);
    });
  });

  describe('Testing update order endpoint', function () {
    beforeEach(async () => {
      await truncateDB();
      const userRes = await Common.dbInsert('users', {
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: 'password123',
      });
      user = userRes ? userRes[0] : {};
    });

    it('should return all orders', async function () {
      const respones1 = await supertest(app).post(ORDER_URL).send({
        customer_id: user.id,
        total: 22,
        order_status: 'pending',
        payment_type: 'paypal',
      });
      expect(respones1.statusCode).toBe(201);

      const order2 = JSON.parse(respones1.text).data;

      const res = await supertest(app).patch(`${ORDER_URL}/${order2.id}`).send({ payment_type: 'Master Card' });
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
      await truncateDB();
      const userRes = await Common.dbInsert('users', {
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: 'password123',
      });
      user = userRes ? userRes[0] : {};
    });

    it('should delete the order with id', async function () {
      const respones1 = await supertest(app).post(ORDER_URL).send({
        customer_id: user.id,
        total: 22,
        order_status: 'pending',
        payment_type: 'paypal',
      });
      expect(respones1.statusCode).toBe(201);

      const order2 = JSON.parse(respones1.text).data;

      const res = await supertest(app).delete(`${ORDER_URL}/${order2.id}`);
      expect(res.statusCode).toBe(200);
    });
  });
});

/*

this a template for writing test suites.

it('should __ an order', async function(){
  // your test code here.
});

*/
