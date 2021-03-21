import { getRepository, Repository } from 'typeorm';

import IScheduleRepository from '@modules/schedule/repositories/IScheduleRepository';
import ICreateScheduleDTO from '@modules/schedule/dtos/ICreateScheduleDTO';

import Schedule from '../entities/Schedule';

class ScheduleRepository implements IScheduleRepository {
  private ormRepository: Repository<Schedule>;

  constructor() {
    this.ormRepository = getRepository(Schedule);
  }

  public async findById(id: string): Promise<Schedule | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findByUser(user_id: string): Promise<Schedule[]> {
    return this.ormRepository.find({
      where: { user_id },
      relations: ['user', 'patient'],
    });
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async create(data: ICreateScheduleDTO): Promise<Schedule> {
    const schedule = this.ormRepository.create(data);

    await this.ormRepository.save(schedule);

    return schedule;
  }

  public async merge(
    schedules: Schedule,
    data: ICreateScheduleDTO,
  ): Promise<Schedule> {
    const schedule = this.ormRepository.merge(schedules, data);
    await this.ormRepository.save(schedule);

    return schedule;
  }

  public async save(schedule: Schedule): Promise<Schedule> {
    return this.ormRepository.save(schedule);
  }

  public async findByDate(date: Date): Promise<Schedule[]> {
    return this.ormRepository.find({ where: { date } });
  }
}

export default ScheduleRepository;
