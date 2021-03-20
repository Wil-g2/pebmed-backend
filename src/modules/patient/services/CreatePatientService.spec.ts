import 'reflect-metadata';
import CreatePatientService from './CreatePatientService';
import FakePatientRepository from '../repositories/fakes/FakePatientRepository';

describe('CreatePatient', () => {
  it('should create a new patient', async () => {
    const fakePatientRepository = new FakePatientRepository();

    const createPatientService = new CreatePatientService(
      fakePatientRepository,
    );

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
  });
});
