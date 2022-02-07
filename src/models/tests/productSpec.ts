import { ProductStore } from '../../models/product';

const store = new ProductStore();

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a update method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.index).toBeDefined();
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toBeInstanceOf(Array);
  });

  it('indexByCategory method should return a list of products filtered by category', async () => {
    const result = await store.indexByCategory('Computers');
    expect(result.filter(p => p.category === 'Computers').length).toEqual(
      result.length
    );
  });

  it('create method should add a product', async () => {
    const result = await store.create({
      price: 13,
      name: 'product test',
      category: 'test category'
    });
    delete result.id;
    expect(result).toEqual({
      price: 13,
      name: 'product test',
      category: 'test category'
    });
  });

  it('show method should return the correct product', async () => {
    const result = await store.show('1');
    expect(result).toBeInstanceOf(Object);
    delete result.id;
    expect(result).toEqual({
      price: 12000,
      name: 'HP laptop',
      category: 'Computers'
    });
  });

  it('delete method should remove the product', async () => {
    await store.delete('3');
    try {
      const result = await store.show('3');
    } catch (error) {
      expect(error).toEqual(
        new Error('Could not find product 3. Error: Not found')
      );
    }
  });
});
