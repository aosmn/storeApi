import express, { Request, Response } from 'express';
import { verifyAuthToken } from '../middleware/auth';
import { Order, OrderStore } from '../models/order';
// TODO: add auth
const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

const indexByUser = async (req: Request, res: Response) => {
  const orders = await store.indexByUser(req.params.id);
  res.json(orders);
};

const indexCompleteByUser = async (req: Request, res: Response) => {
  const orders = await store.indexCompleteByUser(req.params.id);
  res.json(orders);
};

const show = async (req: Request, res: Response) => {
  const order = await store.show(req.params.id);
  res.json(order);
};
// TODO: Add order products
const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      status: req.body.status
    };

    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.params.id);
  res.json(deleted);
};

const orderRoutes = (app: express.Application) => {
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.get('/orders/user/:id/complete', verifyAuthToken, indexCompleteByUser);
  app.get('/orders/user/:id', verifyAuthToken, indexByUser);
  app.post('/orders', verifyAuthToken, create);
  app.delete('/orders/:id', verifyAuthToken, destroy);
};

export default orderRoutes;
