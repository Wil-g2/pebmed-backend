import { injectable, inject } from 'tsyringe';

import { parseISO, startOfHour } from 'date-fns';
import IScheduleRepository from '../repositories/IScheduleRepository';
import scheduleValidation from '../utils/validation';

import Schedule from '../infra/typeorm/entities/Schedule';
import ICreateScheduleDTO from '../dtos/ICreateScheduleDTO';

@injectable()
class CreateScheduleService {
  constructor(
    @inject('ScheduleRepository')
    private scheduleRepository: IScheduleRepository,
  ) {}

  public async execute({
    user_id,
    patient_id,
    date,
  }: ICreateScheduleDTO): Promise<Schedule> {
    const hourStart = startOfHour(parseISO(date.toISOString()));

    await scheduleValidation.validation(this.scheduleRepository, hourStart, '');

    return this.scheduleRepository.create({
      user_id,
      patient_id,
      date: hourStart,
    });
  }
}
export default CreateScheduleService;
