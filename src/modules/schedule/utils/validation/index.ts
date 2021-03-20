import AppError from '@shared/errors/AppError';
import { isBefore } from 'date-fns';
import IScheduleRepository from '../../repositories/IScheduleRepository';

export default class ScheduleValidation {
  public static async validation(
    scheduleRepository: IScheduleRepository,
    hourStart: Date,
    id_patient: string,
  ): Promise<void> {
    if (isBefore(hourStart, new Date())) {
      throw new AppError(
        'the scheduling date cannot be earlier than the current date',
        400,
        'error-api:schedule-before-current-date',
      );
    }
    const schedule = await scheduleRepository.findByDate(hourStart);

    if (schedule.length > 0) {
      schedule.forEach(item => {
        if (item.patient_id !== id_patient) {
          throw new AppError(
            'Schedule alredy exist',
            400,
            'error-api:schedule-alredy-exist',
          );
        }
      });
    }
  }
}
