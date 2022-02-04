import { Order, OrderStore } from '../../models/order';

const store = new OrderStore();

describe('Order Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have an add product method', () => {
    expect(store.addProduct).toBeDefined();
  });

  it('should have an index by user method', () => {
    expect(store.indexByUser).toBeDefined();
  });

  it('should have an index by user completed method', () => {
    expect(store.indexCompleteByUser).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add an order', async () => {
    const result = await store.create({
      id: 12,
      user_id: '1',
      status: 'active'
    });

    expect(result).toEqual({
      id: 12,
      user_id: '1',
      status: 'active'
    });
  });

  it('create method should throw an error if order id exists', async () => {
    let error;
    try {
      const result = await store.create({
        id: 12,
        user_id: '1',
        status: 'active'
      });
    } catch (err) {
      error = err;
    }
    expect(error).toEqual(
      new Error(
        `Could not add new order. Error: error: duplicate key value violates unique constraint "orders_pkey"`
      )
    );
  });

  it("create method should throw an error if user id doesn't exist", async () => {
    let error;
    try {
      const result = await store.create({
        id: 1,
        user_id: '3',
        status: 'active'
      });
    } catch (err) {
      error = err;
    }
    expect(error).toEqual(
      new Error(
        `Could not add new order. Error: error: insert or update on table "orders" violates foreign key constraint "orders_user_id_fkey"`
      )
    );
  });

  it('index method should return a list of orders', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 12,
        user_id: '1',
        status: 'active'
      }
    ]);
  });

  it('indexByUser method should return a list of orders filtered by user', async () => {
    const result = await store.indexByUser('1');
    expect(result).toEqual([
      {
        id: 12,
        user_id: '1',
        status: 'active'
      }
    ]);
    const result2 = await store.indexByUser('2');
    expect(result2).toEqual([]);
  });

  it('indexByUser method should return a list of orders filtered by user and completed', async () => {
    const result = await store.indexCompleteByUser('1');
    expect(result).toEqual([]);
  });

  it('show method should return the correct order', async () => {
    const result = await store.show('12');

    expect(result).toEqual({
      id: 12,
      user_id: '1',
      status: 'active'
    });
  });

  it('add product method should add product to product', async () => {
    const result = await store.addProduct(12, '12', '1');

    expect(result).toEqual({
      id: 1,
      quantity: 12,
      order_id: '12',
      product_id: '1'
    });
  });

  it('show order products method should show products in selected order', async () => {
    const result = await store.showOrderProducts('12');

    expect(result).toEqual([
      {
        name: 'HP laptop',
        category: 'Computers',
        price: 12000,
        quantity: 12,
        product_id: '1',
        order_id: '12'
      }
    ]);
  });

  it('delete order product method should delete product from selected order', async () => {
    await store.deleteOrderProduct('12', '1');

    const result = await store.showOrderProducts('12');
    expect(result).toEqual([]);
  });

  it('delete method should remove the order', async () => {
    await store.delete('12');
    const result = await store.index();

    expect(result).toEqual([]);
  });
});
