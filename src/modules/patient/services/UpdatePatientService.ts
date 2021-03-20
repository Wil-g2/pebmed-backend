import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPatientRepository from '../repositories/IPatientRepository';

import Patient from '../infra/typeorm/entities/Patient';

interface IRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  birth_date: Date;
  gender: number;
  height: number;
  weight: number;
}

@injectable()
class UpdatePatientService {
  constructor(
    @inject('PatientRepository')
    private patientRepository: IPatientRepository,
  ) {}

  public async execute({
    id,
    name,
    phone,
    email,
    birth_date,
    gender,
    height,
    weight,
  }: IRequest): Promise<Patient> {
    const checkExist = await this.patientRepository.findById(id);

    if (!checkExist) {
      throw new AppError(
        'Patient does not exist',
        404,
        'error-api:patient-not-exist',
      );
    }

    const newVacancy = {
      name,
      phone,
      email,
      birth_date,
      gender,
      height,
      weight,
    };

    const vacancy = this.patientRepository.merge(checkExist, newVacancy);

    return vacancy;
  }
}
export default UpdatePatientService;
