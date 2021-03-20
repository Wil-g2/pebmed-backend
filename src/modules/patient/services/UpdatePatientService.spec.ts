import 'reflect-metadata';
import { v4 as uuid } from 'uuid';
import AppError from '@shared/errors/AppError';
import UpdatePatientService from './UpdatePatientService';
import CreatePatientService from './CreatePatientService';
import FakePatientRepository from '../repositories/fakes/FakePatientRepository';

let fakePatientRepository: FakePatientRepository;
let createPatientService: CreatePatientService;
let updatePatientService: UpdatePatientService;

describe('UpdatePatient', () => {
  beforeEach(() => {
    fakePatientRepository = new FakePatientRepository();

    createPatientService = new CreatePatientService(fakePatientRepository);
    updatePatientService = new UpdatePatientService(fakePatientRepository);
  });

  it('should update an specific patient', async () => {
    const patient = await createPatientService.execute({
      name: 'Willian',
      phone: '+553555555555',
      email: 'will@teste.com',
      birth_date: new Date('2000-01-01'),
      gender: 1,
      height: 75.6,
      weight: 80,
    });

    const newPatient = {
      id: patient.id,
      name: 'Willian',
      phone: '+553555555555',
      email: 'will@teste.com',
      birth_date: new Date('2000-01-01'),
      gender: 1,
      height: 75.6,
      weight: 80,
    };

    expect(patient).toHaveProperty('id');
    expect(patient.email).toBe('will@teste.com');

    expect(await updatePatientService.execute(newPatient)).toEqual(newPatient);
  });

  it('should be not able update a patient does not exist', async () => {
    return expect(
      updatePatientService.execute({
        id: uuid(),
        name: 'Willian',
        phone: '+553555555555',
        email: 'will@teste.com',
        birth_date: new Date('2000-01-01'),
        gender: 1,
        height: 75.6,
        weight: 80,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
