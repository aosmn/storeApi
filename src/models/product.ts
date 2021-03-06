import Client from '../database';

export type Product = {
  id?: number;
  name: string;
  category: string;
  price: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      let sql = 'SELECT * FROM products';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }
  async indexByCategory(category: string): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      let sql = 'SELECT * FROM products WHERE category=($1)';

      const result = await conn.query(sql, [category]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }


  // async showTopFive(): Promise<Product[]> {
  //   try {
  //     const conn = await Client.connect();
  //     let sql = 'SELECT * FROM products WHERE category=($1)';

  //     const result = await conn.query(sql, [category]);

  //     conn.release();

  //     return result.rows;
  //   } catch (err) {
  //     throw new Error(`Could not get products. Error: ${err}`);
  //   }
  // }

  async show(id: string): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();
      if (result.rows.length > 0) {
        return result.rows[0];
      }
      throw "Not found";
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(prod: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
      const conn = await Client.connect();

      const result = await conn.query(sql, [
        prod.name,
        prod.price,
        prod.category
      ]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${prod.name}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<number> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const rowCount = result.rowCount;

      conn.release();

      return rowCount;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
