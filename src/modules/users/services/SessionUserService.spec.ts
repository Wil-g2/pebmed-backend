import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import * as faker from 'faker';
import FakeUserRepostitory from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import SessionUserService from './SessionUserService';
import CreateUserService from './CreateUserService';

let fakeUserRepostitory: FakeUserRepostitory;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let sessionUserService: SessionUserService;

describe('Session token', () => {
  beforeEach(() => {
    fakeUserRepostitory = new FakeUserRepostitory();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUserRepostitory,
      fakeHashProvider,
    );

    sessionUserService = new SessionUserService(
      fakeUserRepostitory,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    await createUserService.execute({
      full_name: faker.name.firstName(),
      email,
      password,
      role: 1,
    });

    const user = await sessionUserService.execute({
      email,
      password,
    });

    expect(user).toHaveProperty('token');
  });

  it('should not be able to authenticate with user not existing', async () => {
    return expect(
      sessionUserService.execute({
        email: faker.internet.email(),
        password: faker.internet.password(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const email = faker.internet.email();

    await createUserService.execute({
      full_name: faker.name.firstName(),
      email,
      password: faker.internet.password(),
      role: 1,
    });

    return expect(
      sessionUserService.execute({
        email,
        password: faker.internet.password(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
