import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IScheduleRepository from '../repositories/IScheduleRepository';
import Schedule from '../infra/typeorm/entities/Schedule';

@injectable()
class ShowScheduleByUserService {
  constructor(
    @inject('ScheduleRepository')
    private scheduleRepository: IScheduleRepository,
  ) {}

  public async execute(id: string): Promise<Schedule[]> {
    const schedule = this.scheduleRepository.findByUser(id);

    if (!schedule) {
      throw new AppError('User does not have any schedules');
    }

    return schedule;
  }
}
export default ShowScheduleByUserService;
