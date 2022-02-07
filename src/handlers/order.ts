import express, { Request, Response } from 'express';
import { verifyAuthToken } from '../middleware/auth';
import { Order, OrderStore } from '../models/order';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
};

const indexByUser = async (req: Request, res: Response) => {
  try {
    const orders = await store.indexByUser(req.params.id);
    res.json(orders);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
};

const indexCompleteByUser = async (req: Request, res: Response) => {
  try {
    const orders = await store.indexCompleteByUser(req.params.id);
    res.json(orders);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
};

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
  try {
    const deleted = await store.delete(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
};

const addProduct = async (req: Request, res: Response) => {
  const orderId = req.params.id;
  const productId = req.body.productId;
  const quantity = parseInt(req.body.quantity);
  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const getProducts = async (req: Request, res: Response) => {
  const orderId = req.params.id;
  try {
    const orderProducts = await store.showOrderProducts(orderId);
    res.json(orderProducts);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const { orderId, productId } = req.params;

  try {
    const deleted = await store.deleteOrderProduct(orderId, productId);
    res.json(deleted);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('/orders', index); //

  app.get('/orders/:id/products', verifyAuthToken, getProducts);
  app.post('/orders/:id/products', verifyAuthToken, addProduct);
  app.delete(
    '/orders/:orderId/products/:productId',
    verifyAuthToken,
    deleteProduct
  );

  app.get('/orders/:id', show);
  app.delete('/orders/:id', verifyAuthToken, destroy);

  app.get('/orders/user/:id/complete', verifyAuthToken, indexCompleteByUser);
  app.get('/orders/user/:id', verifyAuthToken, indexByUser);
  app.post('/orders', verifyAuthToken, create);
};

export default orderRoutes;
