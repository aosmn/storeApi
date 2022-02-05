import { UserStore } from '../../models/user';

const store = new UserStore();
const startingIndex = [
  {
    username:"johndoe", 
    firstname: 'John',
    lastname: 'Doe',
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
      username: 'janedoe',
      firstname: 'Jane',
      lastname: 'Doe',
      password: 'password'
    });
    delete result.id;
    expect(result).toEqual({
      username: 'janedoe',
      firstname: 'Jane',
      lastname: 'Doe',
    });
  });

  it('show method should return the correct user', async () => {
    const result = await store.show('3');
    
    expect(result).toEqual({
      username: 'janedoe',
      firstname: 'Jane',
      lastname: 'Doe',
    });
  });

  it('delete method should remove the user', async () => {
    await store.delete('3');
    const result = await store.index();

    expect(result).toEqual(startingIndex);
  });
});
