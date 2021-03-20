import { injectable, inject } from 'tsyringe';

import IPatientRepository from '../repositories/IPatientRepository';
import Patient from '../infra/typeorm/entities/Patient';

@injectable()
class ShowPatientService {
  constructor(
    @inject('PatientRepository')
    private patientRepository: IPatientRepository,
  ) {}

  public async execute(): Promise<Patient[]> {
    return this.patientRepository.findAll();
  }
}
export default ShowPatientService;
