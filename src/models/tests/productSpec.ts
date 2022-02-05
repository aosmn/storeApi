import { ProductStore } from '../../models/product';

const store = new ProductStore();
const startingIndex = [
  { id: 1, name: 'HP laptop', price: 12000, category: 'Computers' },
  { id: 2, name: 'Dell laptop', price: 11000, category: 'Computers' },
  { id: 3, name: 'Lenovo laptop', price: 13000, category: 'Computers' },
  {
    id: 4,
    name: 'HP mouse',
    price: 500,
    category: 'Computer Accessories'
  }
];
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
    expect(result).toEqual(startingIndex);
  });

  it('indexByCategory method should return a list of products filtered by category', async () => {
    const result = await store.indexByCategory('Computers');
    expect(result).toEqual(startingIndex.filter(p => p.category === 'Computers'));
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
    const result = await store.show('6');
    expect(result).toEqual({
      id: 6,
      price: 13,
      name: 'product test',
      category: 'test category'
    });
  });

  it('delete method should remove the product', async () => {
    await store.delete('6');
    const result = await store.index();    

    expect(result).toEqual(startingIndex);
  });
});
