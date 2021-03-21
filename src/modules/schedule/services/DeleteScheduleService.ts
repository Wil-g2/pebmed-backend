import { injectable, inject } from 'tsyringe';

import NotFoundError from '@shared/errors/NotFoundError';
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
      throw new NotFoundError('Schedule');
    }

    await this.scheduleRepository.delete(id);
  }
}
export default DeleteScheduleService;
