import 'reflect-metadata';
import { v4 as uuid } from 'uuid';
import { addDays } from 'date-fns';
import ShowScheduleByUserService from './ShowScheduleByUserService';
import CreateScheduleService from './CreateScheduleService';
import FakeScheduleRepository from '../repositories/fakes/FakeScheduleRepository';
import Schedule from '../infra/typeorm/entities/Schedule';

let fakeScheduleRepository: FakeScheduleRepository;
let createScheduleService: CreateScheduleService;
let showScheduleByUserService: ShowScheduleByUserService;

describe('ShowScheduleByUser', () => {
  beforeEach(() => {
    fakeScheduleRepository = new FakeScheduleRepository();

    createScheduleService = new CreateScheduleService(fakeScheduleRepository);

    showScheduleByUserService = new ShowScheduleByUserService(
      fakeScheduleRepository,
    );
  });

  it('should select all schedules from an specific user', async () => {
    const user_id = uuid();

    const schedules: Schedule[] = [];

    const firstSchedule = await createScheduleService.execute({
      user_id,
      patient_id: uuid(),
      date: addDays(new Date(), 1),
    });
    const secondSchedule = await createScheduleService.execute({
      user_id,
      patient_id: uuid(),
      date: addDays(new Date(), 2),
    });

    schedules.push(firstSchedule, secondSchedule);

    expect(firstSchedule).toHaveProperty('id');
    expect(secondSchedule).toHaveProperty('id');
    expect(firstSchedule.user_id).toBe(user_id);
    expect(secondSchedule.user_id).toBe(user_id);

    expect(await showScheduleByUserService.execute(user_id)).toEqual(schedules);
  });

  it('should not be able show a schedule that does not exist', async () => {
    expect(await showScheduleByUserService.execute(uuid())).toEqual([]);
  });
});
