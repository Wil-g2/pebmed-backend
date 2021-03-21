import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import { v4 as uuid } from 'uuid';
import * as faker from 'faker';
import FakeUserRepostitory from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepostitory: FakeUserRepostitory;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepostitory = new FakeUserRepostitory();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUserRepostitory,
      fakeHashProvider,
    );

    updateProfileService = new UpdateProfileService(
      fakeUserRepostitory,
      fakeHashProvider,
    );
  });

  it('should be able update a user', async () => {
    const email = faker.internet.email();

    const user = await createUserService.execute({
      full_name: faker.name.firstName(),
      email,
      password: faker.internet.password(),
      role: 1,
    });

    const full_name = faker.name.firstName();

    const userUpdate = await updateProfileService.execute({
      id: user.id,
      full_name,
      email,
    });

    expect(userUpdate.full_name).toEqual(full_name);
    expect(userUpdate.email).toEqual(email);
  });

  it('should be not able update a user that does not exist', async () => {
    return expect(
      updateProfileService.execute({
        id: uuid(),
        full_name: faker.name.firstName(),
        email: faker.internet.email(),
        role: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not able update a user when Old password does not match', async () => {
    const user = await createUserService.execute({
      full_name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 1,
    });

    await expect(
      updateProfileService.execute({
        id: user.id,
        full_name: faker.name.firstName(),
        role: 1,
        email: faker.internet.email(),
        password: faker.internet.password(),
        current_password: faker.internet.password(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not able update a user when email already exist', async () => {
    const email = faker.internet.email();

    const user = await createUserService.execute({
      full_name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 1,
    });

    await createUserService.execute({
      full_name: faker.name.firstName(),
      email,
      password: faker.internet.password(),
      role: 1,
    });

    await expect(
      updateProfileService.execute({
        id: user.id,
        full_name: faker.name.firstName(),
        role: 1,
        email,
        password: faker.internet.password(),
        current_password: faker.internet.password(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
