import 'reflect-metadata';
import { v4 as uuid } from 'uuid';
import { subDays, addDays } from 'date-fns';
import AppError from '@shared/errors/AppError';
import CreateScheduleService from './CreateScheduleService';
import FakeScheduleRepository from '../repositories/fakes/FakeScheduleRepository';

let fakeScheduleRepository: FakeScheduleRepository;
let createScheduleService: CreateScheduleService;

describe('CreateSchedule', () => {
  beforeEach(() => {
    fakeScheduleRepository = new FakeScheduleRepository();
    createScheduleService = new CreateScheduleService(fakeScheduleRepository);
  });

  it('should be able create a new schedule', async () => {
    const user_id = uuid();

    const schedule = await createScheduleService.execute({
      user_id,
      patient_id: uuid(),
      date: addDays(new Date(), 1),
    });

    expect(schedule).toHaveProperty('id');
    expect(schedule.user_id).toBe(user_id);
  });

  it('should be not abler create a new schedule date is before current date', async () => {
    expect(
      createScheduleService.execute({
        user_id: uuid(),
        patient_id: uuid(),
        date: subDays(new Date(), 1),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not able create a new schedule date in the same date', async () => {
    const date = addDays(new Date(), 1);

    await createScheduleService.execute({
      user_id: uuid(),
      patient_id: uuid(),
      date,
    });

    try {
      await createScheduleService.execute({
        user_id: uuid(),
        patient_id: uuid(),
        date,
      });
    } catch (e) {
      expect(e).toBeInstanceOf(AppError);
    }
  });
});
