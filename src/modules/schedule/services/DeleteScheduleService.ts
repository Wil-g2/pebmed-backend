import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IScheduleRepository from '../repositories/IScheduleRepository';

@injectable()
class DeleteScheduleService {
  constructor(
    @inject('ScheduleRepository')
    private scheduleRepository: IScheduleRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const checkExist = await this.scheduleRepository.findById(id);

    if (!checkExist) {
      throw new AppError(
        'Schedule does not exist',
        404,
        'error-api:schedule-not-found',
      );
    }

    await this.scheduleRepository.delete(id);
  }
}
export default DeleteScheduleService;
