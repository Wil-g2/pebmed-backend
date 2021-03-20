import Patient from '../infra/typeorm/entities/Patient';
import ICreatePatientDTO from '../dtos/ICreatePatientDTO';

export default interface IVacancyRepository {
  findAll(): Promise<Patient[]>;
  findById(id: string): Promise<Patient | undefined>;
  delete(user_id: string): Promise<void>;
  create(data: ICreatePatientDTO): Promise<Patient>;
  merge(patient: Patient, data: ICreatePatientDTO): Promise<Patient>;
  save(patient: Patient): Promise<Patient>;
}
