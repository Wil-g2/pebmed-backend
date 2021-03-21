import { injectable, inject } from 'tsyringe';

import NotFoundError from '@shared/errors/NotFoundError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundError('User');
    }

    return user;
  }
}
export default ShowUserService;
