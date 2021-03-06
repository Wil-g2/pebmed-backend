import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePatientService from '@modules/patient/services/CreatePatientService';
import ShowAllPatientService from '@modules/patient/services/ShowAllPatientService';
import ShowPatientService from '@modules/patient/services/ShowPatientService';
import UpdatePatientService from '@modules/patient/services/UpdatePatientService';
import DeletePatientService from '@modules/patient/services/DeletePatientService';

export default class PatientController {
  async index(request: Request, response: Response): Promise<Response> {
    const showAllPatientService = container.resolve(ShowAllPatientService);
    const patients = await showAllPatientService.execute();

    return response.status(200).json(patients);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showPatientService = container.resolve(ShowPatientService);
    const patient = await showPatientService.execute(id);
    return response.status(200).json(patient);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      phone,
      email,
      birth_date,
      gender,
      height,
      weight,
    } = request.body;
    const createPatientService = container.resolve(CreatePatientService);
    const patient = await createPatientService.execute({
      name,
      phone,
      email,
      birth_date,
      gender,
      height,
      weight,
    });

    return response.status(201).json(patient);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      id,
      name,
      phone,
      email,
      birth_date,
      gender,
      height,
      weight,
    } = request.body;
    const updatePatientService = container.resolve(UpdatePatientService);
    const patient = await updatePatientService.execute({
      id,
      name,
      phone,
      email,
      birth_date,
      gender,
      height,
      weight,
    });

    return response.status(200).json(patient);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePatientService = container.resolve(DeletePatientService);
    await deletePatientService.execute(id);

    return response.status(204).json();
  }
}
