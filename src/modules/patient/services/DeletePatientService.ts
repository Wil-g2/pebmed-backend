import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPatientRepository from '../repositories/IPatientRepository';

@injectable()
class DeletePatientService {
  constructor(
    @inject('PatientRepository')
    private patientRepository: IPatientRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const checkExist = await this.patientRepository.findById(id);

    if (!checkExist) {
      throw new AppError(
        'Patient does not exist',
        404,
        'error-api:patient-not-exist',
      );
    }

    await this.patientRepository.delete(id);
  }
}
export default DeletePatientService;
