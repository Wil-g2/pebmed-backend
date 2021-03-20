import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
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
      throw new AppError(
        'User does not exist',
        404,
        'error-api:user-not-exist',
      );
    }

    await this.usersRepository.delete(id);
  }
}
export default DeleteUserService;
