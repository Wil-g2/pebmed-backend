import IPatientRepository from '@modules/patient/repositories/IPatientRepository';
import ICreatePatientDTO from '@modules/patient/dtos/ICreatePatientDTO';
import { v4 as uuid } from 'uuid';
import Patient from '../../infra/typeorm/entities/Patient';

class FakePatientRepository implements IPatientRepository {
  private patients: Patient[] = [];

  public async findAll(): Promise<Patient[]> {
    return this.patients;
  }

  public async findById(id: string): Promise<Patient | undefined> {
    const findPatient = this.patients.find(patient => patient.id === id);
    return findPatient;
  }

  public async delete(id: string): Promise<void> {
    this.patients = this.patients.filter(patient => patient.id !== id);
  }

  public async create(data: ICreatePatientDTO): Promise<Patient> {
    const patient = new Patient();

    Object.assign(patient, {
      id: uuid(),
      ...data,
    });

    this.patients.push(patient);

    return patient;
  }

  public async merge(
    patients: Patient,
    data: ICreatePatientDTO,
  ): Promise<Patient> {
    const mergePatient = this.patients.find(
      patient => patient.id === patients.id,
    );

    Object.assign(mergePatient, {
      ...data,
    });

    if (!mergePatient) return patients;

    return mergePatient;
  }

  public async save(patient: Patient): Promise<Patient> {
    return patient;
  }
}

export default FakePatientRepository;
