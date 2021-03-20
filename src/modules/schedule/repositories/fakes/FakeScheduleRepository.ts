import IScheduleRepository from '@modules/schedule/repositories/IScheduleRepository';
import ICreateScheduleDTO from '@modules/schedule/dtos/ICreateScheduleDTO';
import { v4 as uuid } from 'uuid';

import Schedule from '../../infra/typeorm/entities/Schedule';

class FakeScheduleRepository implements IScheduleRepository {
  private schedules: Schedule[] = [];

  public async findById(id: string): Promise<Schedule | undefined> {
    return this.schedules.find(schedule => schedule.id === id);
  }

  public async findByUser(user_id: string): Promise<Schedule[]> {
    const findByUser: Schedule[] = [];

    this.schedules.map(schedule => {
      if (schedule.user_id === user_id) {
        findByUser?.push(schedule);
      }
      return 0;
    });
    return findByUser;
  }

  public async delete(id: string): Promise<void> {
    this.schedules = this.schedules.filter(schedule => schedule.id !== id);
  }

  public async create(data: ICreateScheduleDTO): Promise<Schedule> {
    const schedule = new Schedule();

    Object.assign(schedule, {
      id: uuid(),
      ...data,
    });
    this.schedules.push(schedule);

    return schedule;
  }

  public async merge(
    schedules: Schedule,
    data: ICreateScheduleDTO,
  ): Promise<Schedule> {
    const mergeSchedule = this.schedules.find(
      schedule => schedule.id === schedules.id,
    );

    Object.assign(mergeSchedule, data);

    if (!mergeSchedule) return schedules;

    return mergeSchedule;
  }

  public async save(schedule: Schedule): Promise<Schedule> {
    return schedule;
  }

  public async findByDate(date: Date): Promise<Schedule[]> {
    const itens = this.schedules.filter(item => item.date === date);
    return itens;
  }
}

export default FakeScheduleRepository;
