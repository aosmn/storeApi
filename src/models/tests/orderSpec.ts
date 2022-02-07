import { Order, OrderStore, OrderProduct } from '../../models/order';

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
      user_id: '1',
      status: 'active'
    });
    delete result.id;
    expect(result).toEqual({
      user_id: '1',
      status: 'active'
    });
  });

  it("create method should throw an error if user id doesn't exist", async () => {
    let error;
    try {
      const result = await store.create({
        id: 1,
        user_id: '13',
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
    expect(result).toBeInstanceOf(Array);
  });

  it('indexByUser method should return a list of orders filtered by user', async () => {
    const result = await store.indexByUser('1');
    expect(result).toBeInstanceOf(Array)
    expect(result.filter(order => order.user_id !== '1').length).toEqual(0);
  });

  it('indexByUser method should return a list of orders filtered by user and completed', async () => {
    const result = await store.indexCompleteByUser('1');
    expect(result).toBeInstanceOf(Array)
    expect(result.filter(order => order.user_id !== '1').length).toEqual(0);
    expect(result.filter(order => order.status !== 'complete').length).toEqual(0);
  });

  it('show method should return the correct order', async () => {
    const result = await store.show('1');
    expect(result.id).toEqual(1);
  });

  it('add product method should add product to order', async () => {
    const result = await store.addProduct(12, '1', '1');
    delete result.id;

    expect(result).toEqual({
      quantity: 12,
      order_id: '1',
      product_id: '1'
    });
  });

  it("show order products method should show order's products", async () => {
    const result = await store.showOrderProducts('2');

    expect(
      result.filter((e: OrderProduct) => e.order_id == '2').length
    ).toEqual(result.length);
  });

  it('delete order product method should delete product from selected order', async () => {
    await store.deleteOrderProduct('2', '1');

    const result = await store.showOrderProducts('2');
    expect(result.filter((p:OrderProduct) => p.id === 1)).toEqual([]);
  });

  it('delete method should remove the order', async () => {
    await store.delete('5');
    try {
      const result = await store.show('5');
    } catch (error) {
      expect(error).toEqual(new Error('Could not find order 5. Error: Error: Not Found'));
    }

  });
});
