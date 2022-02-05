import supertest from 'supertest';
import { Product } from '../../models/product';
import { User } from '../../models/user';
import { app } from '../../server';

const request = supertest(app);
let user: User = { username: 'johndoe', password: 'password' };

let product: Product = {
  name: 'New Product',
  category: 'Product Category',
  price: 200
};

const loginUser = async () => {
  const response = await request
    .post('/users/login')
    .send({ username: 'johndoe', password: 'password' });
  user.token = response.body;
};

describe('Products routes', () => {
  describe('GET /products', () => {
    it('should return a list of products', async () => {
      const response = await request.get('/products').expect(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('GET /products/category/:category', () => {
    it('should return a list of products filtered by category', async () => {
      const response = await request
        .get('/products/category/computers')
        .expect(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('GET /products/:id', () => {
    it('should return a JSON object', async () => {
      const response = await request.get('/products/1').expect(200);
      console.log(response.body);

      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({
        id: 1,
        name: 'HP laptop',
        price: 12000,
        category: 'Computers'
      });
    });

    it('should return 404 if not found', async () => {
      const response = await request.get('/products/100').expect(404);
    });
  });

  describe('POST /products', function () {
    describe('Authentication', function () {
      it('should require authorization', async () => {
        const response = await request.post('/products');
        expect(response.status).toBe(401);
      });
    });

    beforeEach(loginUser);

    it('should respond with JSON object', async () => {
      const res = await request
        .post('/products')
        .set('Authorization', `bearer ${user.token}`)
        .send(product)
        .expect(200);

      delete res.body.id;
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toEqual(product);
    });
  });

  describe('DELETE /products/:id', function () {
    describe('Authentication', function () {
      it('should require authorization', async () => {
        const response = await request.delete('/products/5');
        expect(response.status).toBe(401);
      });
    });

    beforeEach(loginUser);

    it('should respond with Success status', async () => {
      await request
        .delete('/products/5')
        .set('Authorization', `bearer ${user.token}`)
        .expect(200);
    });
  });
  
});
