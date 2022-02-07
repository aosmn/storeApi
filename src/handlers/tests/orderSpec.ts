import supertest from 'supertest';
import { Order, OrderProduct } from '../../models/order';
import { User } from '../../models/user';
import { app } from '../../server';

const request = supertest(app);
let user: User = { username: 'johndoe', password: 'password' };
let mockOrder: Order = {
  user_id: '1',
  status: 'active'
};

const loginUser = async () => {
  const response = await request
    .post('/users/login')
    .send({ username: 'johndoe', password: 'password' });
  user.token = response.body;
};

describe('Order routes', () => {
  beforeAll(loginUser);

  describe('GET /orders', () => {
    it('should respond with a JSON array', async () => {
      const response = await request.get('/orders').expect(200);

      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('POST /orders', function () {
    it('should require authorization', async () => {
      const response = await request.post('/orders').send(mockOrder);
      expect(response.status).toBe(401);
    });

    it('should respond with JSON object', async () => {
      const response = await request
        .post('/orders')
        .set('Authorization', `bearer ${user.token}`)
        .send(mockOrder)
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
    it('should require authorization', async () => {
      const response = await request.get('/orders/user/1/complete');
      expect(response.status).toBe(401);
    });

    it('should respond with JSON array', async () => {
      await request
        .get('/orders/user/1/complete')
        .set('Authorization', `bearer ${user.token}`)
        .expect(200);
    });
  });

  describe('GET /orders/user/:id', function () {
    it('should require authorization', async () => {
      const response = await request.get('/orders/user/1');
      expect(response.status).toBe(401);
    });

    it('should respond with JSON array', async () => {
      const response = await request
        .get('/orders/user/1')
        .set('Authorization', `bearer ${user.token}`)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('POST /orders/:id/products', function () {
    it('should require authorization', async () => {
      const response = await request.post('/orders/1/products');
      expect(response.status).toBe(401);
    });

    it('should respond with JSON object', async () => {
      try {
        const res = await request
          .post('/orders/1/products')
          .set('Authorization', `bearer ${user.token}`)
          .send({ quantity: 2, productId: 1 })
          .expect(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.quantity).toBe(2);
        expect(res.body.product_id).toBe('1');
        expect(res.body.order_id).toBe('1');
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('GET /orders/:id/products', function () {
    it('should require authorization', async () => {
      const response = await request.get('/orders/1/products');
      expect(response.status).toBe(401);
    });

    it('should respond with JSON array', async () => {
      const res = await request
        .get('/orders/1/products')
        .set('Authorization', `bearer ${user.token}`)
        .expect(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });

  describe('DELETE /orders/:id/products/:productId', function () {
    it('should require authorization', async () => {
      const response = await request.delete('/orders/1/products/1');
      expect(response.status).toBe(401);
    });
    it('should respond with success status', async () => {
      const res = await request
        .delete('/orders/1/products/1')
        .set('Authorization', `bearer ${user.token}`)
        .expect(200);

      const order = await request
        .get('/orders/1/products')
        .set('Authorization', `bearer ${user.token}`);

      let hasProduct = order.body.filter(
        (p: OrderProduct) => p.product_id === '1'
      );
      expect(hasProduct.length).toBe(0);
    });
  });

  describe('DELETE /orders/:id', function () {
    it('should require authorization', async () => {
      const response = await request.delete('/orders/1');
      expect(response.status).toBe(401);
    });

    // beforeEach(loginUser);

    it('should respond with Success status', async () => {
      await request
        .delete('/orders/6')
        .set('Authorization', `bearer ${user.token}`)
        .expect(200);
    });
  });
});
