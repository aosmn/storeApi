import supertest from 'supertest';
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

describe('Users routes', () => {
  beforeAll(loginUser);

  describe('POST /users/login', () => {
    it('should respond with a JWT if user data is correct', async () => {
      const response = await request
        .post('/users/login')
        .send({ username: 'johndoe', password: 'password' });
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(String);
    });

    it("should respond with an error if user data isn't correct", async () => {
      request
        .post('/users/login')
        .send({ username: 'johndoe', password: 'passwor' })
        .expect(401)
        .catch(err => {
          expect(err).toEqual(new Error('Wrong Credentials'));
        });
    });
  });

  describe('GET /users', function () {
    describe('Authentication', function () {
      it('should require authorization', async () => {
        const response = await request.get('/users');
        expect(response.status).toBe(401);
      });
    });

    it('should respond with JSON array', async () => {
      const response = await request
        .get('/users')
        .set('Authorization', `bearer ${user.token}`)
        .expect(200)
        .expect('Content-Type', /json/);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('POST /users', function () {
    describe('Authentication', function () {
      it('should require authorization', async () => {
        const response = await request.get('/users');
        expect(response.status).toBe(401);
      });
    });

    it('should respond with JWT token', async () => {
      const response = await request
        .post('/users')
        .set('Authorization', `bearer ${user.token}`)
        .send({
          username: 'janeDoey',
          firstname: 'Jane',
          lastname: 'Doey',
          password: 'password'
        })
        .expect(200);

      expect(response.body).toBeInstanceOf(Object);
      delete response.body.user.id;
      expect(response.body.user).toEqual({
        username: 'janeDoey',
        firstname: 'Jane',
        lastname: 'Doey'
      });
    });
  });

  describe('GET /users/:id', function () {
    describe('Authentication', function () {
      it('should require authorization', async () => {
        const response = await request.get('/users');
        expect(response.status).toBe(401);
      });
    });

    it('should respond a success status', async () => {
      const response = await request
        .get('/users/1')
        .set('Authorization', `bearer ${user.token}`)
        .expect(200);
    });
  });

  describe('DELETE /users/:id', function () {
    describe('Authentication', function () {
      it('should require authorization', async () => {
        const response = await request.delete('/users/2');
        expect(response.status).toBe(401);
      });
    });

    it('should respond a success status', async () => {
      await request
        .delete('/users/2')
        .set('Authorization', `bearer ${user.token}`)
        .expect(200);
    });
  });
});
