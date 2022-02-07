import Client from '../database';

export type Order = {
  id?: number;
  user_id: string;
  status: string;
};

export type OrderProduct = {
  id?: number;
  quantity: number;
  order_id: string;
  product_id: string;
  name?: string;
  price?: number;
  category?: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      let sql = 'SELECT * FROM orders';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async indexByUser(userId: string): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      let sql = 'SELECT * FROM orders WHERE user_id = ($1)';

      const result = await conn.query(sql, [userId]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async indexCompleteByUser(userId: string): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      let sql = 'SELECT * FROM orders WHERE user_id = ($1) AND status = ($2)';
      const result = await conn.query(sql, [userId, 'complete']);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();
      if (result.rows.length > 0) {
        return result.rows[0];
      }
      throw new Error('Not Found');
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
      const conn = await Client.connect();
      const result = await conn.query(sql, [o.user_id, o.status]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<OrderProduct> {
    // Check if order exists and status is open
    try {
      const ordersql = 'SELECT * FROM orders WHERE id=($1)';
      //@ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(ordersql, [orderId]);

      const order = result.rows[0];

      if (!order) {
        throw new Error(
          `Could not add product ${productId} to order ${orderId} because order doesn't exist`
        );
      }
      if (order.status !== 'active') {
        throw new Error(
          `Could not add product ${productId} to order ${orderId} because order status is ${order.status}`
        );
      }      

      conn.release();
    } catch (err) {
      throw new Error(`${err}`);
    }

    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      const conn = await Client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }

  async showOrderProducts(id: string): Promise<any> {
    try {
      const sql = `SELECT name, category, price, quantity, product_id, order_id FROM products
                   INNER JOIN order_products
                   ON products.id = order_products.id
                   WHERE order_id=($1)
                  `;
      // const sql = 'SELECT * FROM orders WHERE id=($1)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async deleteOrderProduct(
    orderId: string,
    productId: string
  ): Promise<OrderProduct> {
    try {
      const sql =
        'DELETE FROM order_products WHERE order_id=($1) AND product_id=($2)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [orderId, productId]);

      const orderProduct = result.rows[0];

      conn.release();

      return orderProduct;
    } catch (err) {
      throw new Error(
        `Could not delete product ${productId} from order ${productId}. Error: ${err}`
      );
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
