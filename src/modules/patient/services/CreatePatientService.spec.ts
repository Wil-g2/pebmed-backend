import 'reflect-metadata';
import * as faker from 'faker';
import CreatePatientService from './CreatePatientService';
import FakePatientRepository from '../repositories/fakes/FakePatientRepository';

describe('CreatePatient', () => {
  it('should create a new patient', async () => {
    const fakePatientRepository = new FakePatientRepository();

    const createPatientService = new CreatePatientService(
      fakePatientRepository,
    );

    const email = faker.internet.email();
    const patient = await createPatientService.execute({
      name: faker.name.firstName(1),
      phone: faker.phone.phoneNumberFormat(),
      email,
      birth_date: new Date('2000-01-01'),
      gender: 1,
      height: faker.random.float(),
      weight: faker.random.float(),
    });

    expect(patient).toHaveProperty('id');
    expect(patient.email).toBe(email);
  });
});
