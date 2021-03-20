import 'reflect-metadata';
import { v4 as uuid } from 'uuid';
import { addDays } from 'date-fns';
import UpdateScheduleService from './UpdateScheduleService';
import CreateScheduleService from './CreateScheduleService';
import FakeScheduleRepository from '../repositories/fakes/FakeScheduleRepository';

describe('Update Schedule', () => {
  it('should be albe update an specific schedule', async () => {
    const fakeScheduleRepository = new FakeScheduleRepository();

    const createScheduleService = new CreateScheduleService(
      fakeScheduleRepository,
    );
    const updateScheduleService = new UpdateScheduleService(
      fakeScheduleRepository,
    );

    const user_id = uuid();

    const schedule = await createScheduleService.execute({
      user_id,
      patient_id: uuid(),
      date: addDays(new Date(), 1),
    });

    const newSchedule = {
      id: schedule.id,
      user_id,
      patient_id: schedule.patient_id,
      date: schedule.date,
      note: 'Test',
    };

    expect(schedule).toHaveProperty('id');
    expect(schedule.user_id).toBe(user_id);

    expect(await updateScheduleService.execute(newSchedule)).toEqual(
      newSchedule,
    );
  });
});
