import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import { v4 as uuid } from 'uuid';
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
    const user = await createUserService.execute({
      full_name: 'Will',
      email: 'teste@teste.com',
      password: '123456',
      role: 1,
    });

    const userUpdate = await updateProfileService.execute({
      id: user.id,
      full_name: 'Update',
      email: 'teste1@teste.com',
    });

    expect(userUpdate.full_name).toEqual('Update');
    expect(userUpdate.email).toEqual('teste1@teste.com');
  });

  it('should be not able update a user that does not exist', async () => {
    return expect(
      updateProfileService.execute({
        id: uuid(),
        full_name: 'Update',
        email: 'teste1@teste.com',
        role: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not able update a user when Old password does not match', async () => {
    const user = await createUserService.execute({
      full_name: 'Will',
      email: 'teste@teste.com',
      password: '123456',
      role: 1,
    });

    await expect(
      updateProfileService.execute({
        id: user.id,
        full_name: 'Update',
        role: 1,
        email: 'testeupdate@teste.com',
        password: '123456',
        current_password: 'current_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not able update a user when email already exist', async () => {
    const user = await createUserService.execute({
      full_name: 'Will',
      email: 'will@teste.com',
      password: '123456',
      role: 1,
    });

    await createUserService.execute({
      full_name: 'Other user',
      email: 'teste@teste.com',
      password: '123456',
      role: 1,
    });

    await expect(
      updateProfileService.execute({
        id: user.id,
        full_name: 'Update',
        role: 1,
        email: 'teste@teste.com',
        password: '123456',
        current_password: 'current_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
