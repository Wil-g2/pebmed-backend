import { injectable, inject } from 'tsyringe';

import NotFoundError from '@shared/errors/NotFoundError';
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
      throw new NotFoundError('Schedule');
    }

    return schedule;
  }
}
export default ShowScheduleService;
