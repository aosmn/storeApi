import express, { Request, Response } from 'express';
import { verifyAuthToken } from '../middleware/auth';
import { Product, ProductStore } from '../models/product';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (error) {
    res.status(400);
    res.send(error)
  }
};

const indexByCategory = async (req: Request, res: Response) => {
  const {category} = req.params;
  if (category) {
    const products = await store.indexByCategory(req.params.category);
    res.json(products);
  } else {
    res.status(400);
    res.send(new Error('Missing category name'))
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404);
    res.send(new Error('Product not found'))
  }
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
  try {
    const deleted = await store.delete(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.status(400);
    res.send(error)
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/category/:category', indexByCategory);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
  app.delete('/products/:id', verifyAuthToken, destroy);
};

export default productRoutes;
