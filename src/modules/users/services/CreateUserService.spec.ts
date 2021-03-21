import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import * as faker from 'faker';
import FakeUserRepostitory from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUserRepostitory: FakeUserRepostitory;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepostitory = new FakeUserRepostitory();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUserRepostitory,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      full_name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 1,
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user when email already exist', async () => {
    const email = faker.internet.email();
    await createUserService.execute({
      full_name: faker.name.firstName(),
      email,
      password: faker.internet.password(),
      role: 1,
    });

    return expect(
      createUserService.execute({
        full_name: faker.name.firstName(),
        email,
        password: faker.internet.password(),
        role: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
