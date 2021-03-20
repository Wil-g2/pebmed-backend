import Schedule from '../infra/typeorm/entities/Schedule';
import ICreateScheduleDTO from '../dtos/ICreateScheduleDTO';

export default interface IScheduleRepository {
  findById(id: string): Promise<Schedule | undefined>;
  findByUser(user_id: string): Promise<Schedule[]>;
  delete(user_id: string): Promise<void>;
  create(data: ICreateScheduleDTO): Promise<Schedule>;
  merge(schedule: Schedule, data: ICreateScheduleDTO): Promise<Schedule>;
  save(schedule: Schedule): Promise<Schedule>;
  findByDate(date: Date): Promise<Schedule[]>;
}
