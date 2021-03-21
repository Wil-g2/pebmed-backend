import { injectable, inject } from 'tsyringe';

import { parseISO, startOfHour } from 'date-fns';
import NotFoundError from '@shared/errors/NotFoundError';
import IScheduleRepository from '../repositories/IScheduleRepository';
import scheduleValidation from '../utils/validation';
import Schedule from '../infra/typeorm/entities/Schedule';

interface IRequest {
  id: string;
  user_id: string;
  patient_id: string;
  note: string;
  date: Date;
}

@injectable()
class UpdateScheduleService {
  constructor(
    @inject('ScheduleRepository')
    private scheduleRepository: IScheduleRepository,
  ) {}

  public async execute({
    id,
    user_id,
    patient_id,
    note,
    date,
  }: IRequest): Promise<Schedule> {
    const checkExist = await this.scheduleRepository.findById(id);

    if (!checkExist) {
      throw new NotFoundError('Schedule');
    }
    const current_date = date || checkExist.date;
    const hourStart = startOfHour(parseISO(current_date.toISOString()));

    await scheduleValidation.validation(
      this.scheduleRepository,
      hourStart,
      patient_id || checkExist.patient_id,
    );

    const newSchedule = {
      user_id: user_id || checkExist.user_id,
      patient_id: patient_id || checkExist.patient_id,
      note: note || checkExist.note,
      date: date || checkExist.date,
    };

    return this.scheduleRepository.merge(checkExist, newSchedule);
  }
}
export default UpdateScheduleService;
