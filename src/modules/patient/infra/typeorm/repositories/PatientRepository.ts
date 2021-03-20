import { getRepository, Repository } from 'typeorm';

import IPatientRepository from '@modules/patient/repositories/IPatientRepository';
import ICreatePatientDTO from '@modules/patient/dtos/ICreatePatientDTO';

import Patient from '../entities/Patient';

class PatientRepository implements IPatientRepository {
  private ormRepository: Repository<Patient>;

  constructor() {
    this.ormRepository = getRepository(Patient);
  }

  public async findAll(): Promise<Patient[]> {
    return this.ormRepository.find();
  }

  public async findById(id: string): Promise<Patient | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async create(data: ICreatePatientDTO): Promise<Patient> {
    const patient = this.ormRepository.create(data);

    await this.ormRepository.save(patient);

    return patient;
  }

  public async merge(
    patients: Patient,
    data: ICreatePatientDTO,
  ): Promise<Patient> {
    const patient = this.ormRepository.merge(patients, data);
    await this.ormRepository.save(patient);

    return patient;
  }

  public async save(patient: Patient): Promise<Patient> {
    return this.ormRepository.save(patient);
  }
}

export default PatientRepository;
