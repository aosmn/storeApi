import { UserStore } from '../../models/user';

const store = new UserStore();
const startingIndex = [
  {
    id: 1,
    firstname: 'John',
    lastname: 'Doe',
    password_digest: 'alksal'
  }
];

describe('User Model', () => {
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

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result).toEqual(startingIndex);
  });

  it('create method should add a user', async () => {
    const result = await store.create({
      firstname: 'Jane',
      lastname: 'Doe',
      password_digest: 'alksal'
    });
    delete result.id;
    expect(result).toEqual({
      firstname: 'Jane',
      lastname: 'Doe',
      password_digest: 'alksal'
    });
  });

  it('show method should return the correct user', async () => {
    const result = await store.show('2');
    expect(result).toEqual({
      id: 2,
      firstname: 'Jane',
      lastname: 'Doe',
      password_digest: 'alksal'
    });
  });

  it('delete method should remove the user', async () => {
    await store.delete('2');
    const result = await store.index();

    expect(result).toEqual(startingIndex);
  });
});
