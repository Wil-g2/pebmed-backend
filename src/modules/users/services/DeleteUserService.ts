import { injectable, inject } from 'tsyringe';

import NotFoundError from '@shared/errors/NotFoundError';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const checkUserExist = await this.usersRepository.findById(id);

    if (!checkUserExist) {
      throw new NotFoundError('User');
    }

    await this.usersRepository.delete(id);
  }
}
export default DeleteUserService;
