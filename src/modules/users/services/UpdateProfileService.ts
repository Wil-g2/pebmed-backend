import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  id: string;
  password?: string;
  current_password?: string;
  full_name?: string;
  email: string;
  role?: number;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(data: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(data.id);

    if (!user) {
      throw new AppError(
        'User does not exist',
        404,
        'error-api:user-not-exist',
      );
    }

    if (data.password && data.current_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        data.current_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError(
          'Old password does not match',
          400,
          'error-api:password-does-not-match',
        );
      }

      const passwordHashed = await this.hashProvider.generateHash(
        data.password,
      );
      user.password = passwordHashed;
    }

    const checkEmail = await this.usersRepository.findByEmail(data.email);

    if (checkEmail && checkEmail.id !== data.id) {
      throw new AppError(
        'Email alread exist',
        400,
        'error-api:email-already-exist',
      );
    }

    user.full_name = data.full_name ? data.full_name : user.full_name;
    user.role = data.role ? data.role : user.role;
    user.email = data.email ? data.email : user.full_name;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
