import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

import IUserRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class SessionUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        'User name or password incorrect.',
        400,
        'error-api:wrong-credentials',
      );
    }

    const passwordCheck = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordCheck) {
      throw new AppError(
        'User name or password incorrect.',
        400,
        'error-api:wrong-credentials',
      );
    }

    const token = sign(
      { user: user.id, role: user.role },
      process.env.SECRET || 'SECRET',
      {
        subject: user.id,
        expiresIn: '1d',
      },
    );

    return { user, token };
  }
}

export default SessionUserService;
