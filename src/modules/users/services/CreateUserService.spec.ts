import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
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
      full_name: 'Will',
      email: 'teste@teste.com',
      password: '123456',
      role: 1,
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user when email already exist', async () => {
    await createUserService.execute({
      full_name: 'Will',
      email: 'teste@teste.com',
      password: '123456',
      role: 1,
    });

    return expect(
      createUserService.execute({
        full_name: 'Will',
        email: 'teste@teste.com',
        password: '123456',
        role: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
