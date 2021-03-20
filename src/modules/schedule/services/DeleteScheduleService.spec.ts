import 'reflect-metadata';
import { v4 as uuid } from 'uuid';
import { addDays } from 'date-fns';
import AppError from '@shared/errors/AppError';
import DeleteScheduleService from './DeleteScheduleService';
import CreateScheduleService from './CreateScheduleService';
import FakeScheduleRepository from '../repositories/fakes/FakeScheduleRepository';

let fakeScheduleRepository: FakeScheduleRepository;
let createScheduleService: CreateScheduleService;
let deleteScheduleService: DeleteScheduleService;

describe('DeleteSchedule', () => {
  beforeEach(() => {
    fakeScheduleRepository = new FakeScheduleRepository();

    createScheduleService = new CreateScheduleService(fakeScheduleRepository);

    deleteScheduleService = new DeleteScheduleService(fakeScheduleRepository);
  });

  it('should delete a schedule', async () => {
    const user_id = uuid();

    const schedule = await createScheduleService.execute({
      user_id,
      patient_id: uuid(),
      date: addDays(new Date(), 1),
    });

    expect(schedule).toHaveProperty('id');
    expect(schedule.user_id).toBe(user_id);

    expect(await deleteScheduleService.execute(schedule.id)).toBe(undefined);
  });

  it('should not be able delete a schedule that does not exist', async () => {
    return expect(deleteScheduleService.execute(uuid())).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
