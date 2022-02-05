import express, { Request, Response } from 'express';
import { generateToken } from '../helpers/auth';
import { verifyAuthToken } from '../middleware/auth';
import { User, UserStore } from '../models/user';
// TODO: add auth
// TODO: add password encryption
const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id);
  delete user.password_digest;

  res.json(user);
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password
    };

    const newUser = await store.create(user);
    const token = generateToken(newUser);
    res.json({ user: newUser, token });
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await store.authenticate(username, password);
    if (user) {
      const token = generateToken(user);
      res.json(token);
    } else {
      res.status(401);
      res.send('Authentication Error');
    }
  } catch (err) {
    res.status(401);
    res.send(new Error('Authentication Error, Invalid credentials'));
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.params.id);
  res.json(deleted);
};

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.post('/users', create);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users/login', authenticate);
  app.delete('/users/:id', verifyAuthToken, destroy);
};

export default userRoutes;
