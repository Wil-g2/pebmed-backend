import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import { v4 as uuid } from 'uuid';
import * as faker from 'faker';
import DeleteUserService from './DeleteUserService';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let deleteUserService: DeleteUserService;

describe('Delete User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    deleteUserService = new DeleteUserService(fakeUsersRepository);
  });

  it('should be able delete a user', async () => {
    const user = await createUserService.execute({
      full_name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 1,
    });

    expect(user).toHaveProperty('id');

    expect(await deleteUserService.execute(user.id)).toBe(undefined);
  });

  it('should not be able delete a user that does not exist', async () => {
    return expect(deleteUserService.execute(uuid())).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
