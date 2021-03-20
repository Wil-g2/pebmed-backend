import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
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
    await createUserService.execute({
      full_name: 'Will',
      email: 'teste@teste.com',
      password: '123456',
      role: 1,
    });

    const user = await sessionUserService.execute({
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(user).toHaveProperty('token');
  });

  it('should not be able to authenticate with user not existing', async () => {
    return expect(
      sessionUserService.execute({
        email: 'notexist@teste.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUserService.execute({
      full_name: 'Will',
      email: 'will@teste.com',
      password: '123456',
      role: 1,
    });

    return expect(
      sessionUserService.execute({
        email: 'will@teste.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
