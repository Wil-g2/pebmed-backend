import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IScheduleRepository from '../repositories/IScheduleRepository';
import Schedule from '../infra/typeorm/entities/Schedule';

@injectable()
class ShowScheduleService {
  constructor(
    @inject('ScheduleRepository')
    private scheduleRepository: IScheduleRepository,
  ) {}

  public async execute(id: string): Promise<Schedule | undefined> {
    const schedule = await this.scheduleRepository.findById(id);

    if (!schedule) {
      throw new AppError(
        'Schedule does not exist',
        404,
        'error-api:schedule-not-found',
      );
    }

    return schedule;
  }
}
export default ShowScheduleService;
