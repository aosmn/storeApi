import supertest from 'supertest';
import { OrderProduct } from '../../models/order';
import { User } from '../../models/user';
import { app } from '../../server';

const request = supertest(app);
let user: User = { username: 'johndoe', password: 'password' };

const loginUser = async () => {
  const response = await request
    .post('/users/login')
    .send({ username: 'johndoe', password: 'password' });
  user.token = response.body;
};

describe('Order routes', () => {
  describe('GET /orders', () => {
    it('should respond with a JSON array', async () => {
      const response = await request.get('/orders').expect(200);

      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('POST /orders', function () {
    describe('Authentication', function () {
      it('should require authorization', async () => {
        const response = await request.post('/orders').send({
          user_id: '1',
          status: 'active'
        });
        expect(response.status).toBe(401);
      });
    });

    beforeEach(loginUser);

    it('should respond with JSON object', async () => {
      const response = await request
        .post('/orders')
        .set('Authorization', `bearer ${user.token}`)
        .send({
          user_id: '1',
          status: 'active'
        })
        .expect(200)
        .expect('Content-Type', /json/);
      expect(response.body).toBeInstanceOf(Object);
    });
  });

  describe('GET /orders/:id', () => {
    it('should respond with an object', async () => {
      const response = await request.get('/orders/1').expect(200);

      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.id).toEqual(1);
    });
  });

  describe('GET /orders/user/:id/complete', function () {
    describe('Authentication', function () {
      it('should require authorization', async () => {
        const response = await request.get('/orders/user/1/complete');
        expect(response.status).toBe(401);
      });
    });

    beforeEach(loginUser);

    it('should respond with JSON array', async () => {
      await request
        .get('/orders/user/1/complete')
        .set('Authorization', `bearer ${user.token}`)
        .expect(200);
    });
  });

  describe('GET /orders/user/:id', function () {
    describe('Authentication', function () {
      it('should require authorization', async () => {
        const response = await request.get('/orders/user/1');
        expect(response.status).toBe(401);
      });
    });

    beforeEach(loginUser);

    it('should respond with JSON array', async () => {
      await request
        .get('/orders/user/1')
        .set('Authorization', `bearer ${user.token}`)
        .expect(200);
    });
  });

  describe('POST /orders/:id/products', function () {
    describe('Authentication', function () {
      it('should require authorization', async () => {
        const response = await request.post('/orders/1/products');
        expect(response.status).toBe(401);
      });
    });

    beforeEach(loginUser);

    it('should respond with JSON object', async () => {
      const res = await request
        .post('/orders/1/products')
        .set('Authorization', `bearer ${user.token}`)
        .send({ quantity: 2, productId: 1 })
        .expect(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.quantity).toBe(2);
      expect(res.body.product_id).toBe('1');
      expect(res.body.order_id).toBe('1');
    });
  });

  describe('GET /orders/:id/products', function () {
    describe('Authentication', function () {
      it('should require authorization', async () => {
        const response = await request.get('/orders/1/products');
        expect(response.status).toBe(401);
      });
    });

    beforeEach(loginUser);

    it('should respond with JSON array', async () => {
      const res = await request
        .get('/orders/1/products')
        .set('Authorization', `bearer ${user.token}`)
        .expect(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body).toEqual([
        {
          name: 'HP laptop',
          category: 'Computers',
          price: 12000,
          quantity: 2,
          product_id: '1',
          order_id: '1'
        }
      ]);
    });
  });

  describe('DELETE /orders/:id/products/:productId', function () {
    describe('Authentication', function () {
      it('should require authorization', async () => {
        const response = await request.delete('/orders/1/products/1');
        expect(response.status).toBe(401);
      });
    });

    beforeEach(loginUser);

    it('should respond with success status', async () => {
      const res = await request
        .delete('/orders/1/products/1')
        .set('Authorization', `bearer ${user.token}`)
        .expect(200);

      const order = await request
        .get('/orders/1/products')
        .set('Authorization', `bearer ${user.token}`);

      let hasProduct = order.body.filter((p: OrderProduct) => p.product_id === '1');
      expect(hasProduct.length).toBe(0);
    });
  });

  describe('DELETE /orders/:id', function () {
    describe('Authentication', function () {
      it('should require authorization', async () => {
        const response = await request.delete('/orders/1');
        expect(response.status).toBe(401);
      });
    });

    beforeEach(loginUser);

    it('should respond with Success status', async () => {
      await request
        .delete('/orders/1')
        .set('Authorization', `bearer ${user.token}`)
        .expect(200);
    });
  });
});
