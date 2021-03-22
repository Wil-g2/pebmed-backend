import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateScheduleService from '@modules/schedule/services/CreateScheduleService';
import ShowScheduleService from '@modules/schedule/services/ShowScheduleService';
import ShowScheduleByUserService from '@modules/schedule/services/ShowScheduleByUserService';
import UpdateScheduleService from '@modules/schedule/services/UpdateScheduleService';
import DeleteScheduleService from '@modules/schedule/services/DeleteScheduleService';
import { classToClass } from 'class-transformer';

export default class ScheduleController {
  async showScheduleByUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.user;
    const showScheduleByUserService = container.resolve(
      ShowScheduleByUserService,
    );
    const schedule = await showScheduleByUserService.execute(id);

    return response.status(200).json(classToClass(schedule));
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showScheduleService = container.resolve(ShowScheduleService);
    const schedule = await showScheduleService.execute(id);
    return response.status(200).json(classToClass(schedule));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id, patient_id, date } = request.body;
    const createScheduleService = container.resolve(CreateScheduleService);
    const schedule = await createScheduleService.execute({
      user_id,
      patient_id,
      date,
    });

    return response.status(201).json(schedule);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { user_id, patient_id, date, note } = request.body;
    const updateScheduleService = container.resolve(UpdateScheduleService);
    const schedule = await updateScheduleService.execute({
      id,
      user_id,
      patient_id,
      date,
      note,
    });

    return response.status(200).json(schedule);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteScheduleService = container.resolve(DeleteScheduleService);
    await deleteScheduleService.execute(id);

    return response.status(204).json();
  }
}
