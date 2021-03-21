import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import { v4 as uuid } from 'uuid';
import * as faker from 'faker';
import ShowUserService from './ShowUserService';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('Show a user', () => {
  it('should be able show a user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const showUser = new ShowUserService(fakeUsersRepository);

    const user = await createUser.execute({
      full_name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 1,
    });

    expect(user).toHaveProperty('id');

    expect(await showUser.execute(user.id)).toBe(user);
  });

  it('should not be able show a user that does not exist', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const showUser = new ShowUserService(fakeUsersRepository);

    return expect(showUser.execute(uuid())).rejects.toBeInstanceOf(AppError);
  });
});
