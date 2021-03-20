import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPatientRepository from '../repositories/IPatientRepository';
import Patient from '../infra/typeorm/entities/Patient';

@injectable()
class ShowPatientService {
  constructor(
    @inject('PatientRepository')
    private patientRepository: IPatientRepository,
  ) {}

  public async execute(id: string): Promise<Patient | undefined> {
    const patient = await this.patientRepository.findById(id);

    if (!patient) {
      throw new AppError(
        'Patient does not exist',
        404,
        'error-api:patient-not-exist',
      );
    }

    return patient;
  }
}
export default ShowPatientService;
