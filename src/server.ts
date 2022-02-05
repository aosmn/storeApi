import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import orderRoutes from './handlers/order';
import userRoutes from './handlers/user';
import productRoutes from './handlers/product';

export const app = express();
const address = '0.0.0.0:3000';


app.use(bodyParser.json());
orderRoutes(app);
userRoutes(app);
productRoutes(app);

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
