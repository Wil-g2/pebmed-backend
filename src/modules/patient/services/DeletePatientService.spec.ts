import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import { v4 as uuid } from 'uuid';
import DeletePatientService from './DeletePatientService';
import CreatePatientService from './CreatePatientService';
import FakePatientRepository from '../repositories/fakes/FakePatientRepository';

let fakePatientRepository: FakePatientRepository;
let createPatientService: CreatePatientService;
let deletePatientService: DeletePatientService;

describe('DeletePatient', () => {
  beforeEach(() => {
    fakePatientRepository = new FakePatientRepository();

    createPatientService = new CreatePatientService(fakePatientRepository);
    deletePatientService = new DeletePatientService(fakePatientRepository);
  });

  it('should delete a patient', async () => {
    const patient = await createPatientService.execute({
      name: 'Willian',
      phone: '+553555555555',
      email: 'will@teste.com',
      birth_date: new Date('2000-01-01'),
      gender: 1,
      height: 75.6,
      weight: 80,
    });

    expect(patient).toHaveProperty('id');
    expect(patient.email).toBe('will@teste.com');

    expect(await deletePatientService.execute(patient.id)).toBe(undefined);
  });

  it('should be not able delete a patient does not exist', async () => {
    return expect(deletePatientService.execute(uuid())).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
