import 'reflect-metadata';
import { v4 as uuid } from 'uuid';
import { addDays } from 'date-fns';
import AppError from '@shared/errors/AppError';
import ShowScheduleService from './ShowScheduleService';
import CreateScheduleService from './CreateScheduleService';
import FakeScheduleRepository from '../repositories/fakes/FakeScheduleRepository';

let fakeScheduleRepository: FakeScheduleRepository;
let createScheduleService: CreateScheduleService;
let showScheduleService: ShowScheduleService;

describe('ShowSchedule', () => {
  beforeEach(() => {
    fakeScheduleRepository = new FakeScheduleRepository();

    createScheduleService = new CreateScheduleService(fakeScheduleRepository);

    showScheduleService = new ShowScheduleService(fakeScheduleRepository);
  });

  it('should select an specific schedule', async () => {
    const user_id = uuid();

    const schedule = await createScheduleService.execute({
      user_id,
      patient_id: uuid(),
      date: addDays(new Date(), 1),
    });

    expect(schedule).toHaveProperty('id');
    expect(schedule.user_id).toBe(user_id);

    expect(await showScheduleService.execute(schedule.id)).toBe(schedule);
  });

  it('should not be able show a schedule that does not exist', async () => {
    expect(showScheduleService.execute(uuid())).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
