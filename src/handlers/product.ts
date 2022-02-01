import express, { Request, Response } from 'express';
import { verifyAuthToken } from '../middleware/auth';
import { Product, ProductStore } from '../models/product';
// TODO: add auth
const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const indexByCategory = async (req: Request, res: Response) => {
  const products = await store.indexByCategory(req.params.id);
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id);
  res.json(product);
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      category: req.body.category,
      price: req.body.price
    };

    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.params.id);
  res.json(deleted);
};

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/category/:id', indexByCategory);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
  app.delete('/products/:id', verifyAuthToken, destroy);
};

export default productRoutes;
