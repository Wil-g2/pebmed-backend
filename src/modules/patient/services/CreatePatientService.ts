import { injectable, inject } from 'tsyringe';

import IPatientRepository from '../repositories/IPatientRepository';

import Patient from '../infra/typeorm/entities/Patient';
import ICreatePatientDTO from '../dtos/ICreatePatientDTO';

@injectable()
class CreatePatientService {
  constructor(
    @inject('PatientRepository')
    private patientRepository: IPatientRepository,
  ) {}

  public async execute({
    name,
    phone,
    email,
    birth_date,
    gender,
    height,
    weight,
  }: ICreatePatientDTO): Promise<Patient> {
    return this.patientRepository.create({
      name,
      phone,
      email,
      birth_date,
      gender,
      height,
      weight,
    });
  }
}
export default CreatePatientService;
