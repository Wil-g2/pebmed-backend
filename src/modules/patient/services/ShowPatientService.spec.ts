import 'reflect-metadata';
import { v4 as uuid } from 'uuid';
import * as faker from 'faker';
import AppError from '@shared/errors/AppError';
import ShowPatientService from './ShowPatientService';
import CreatePatientService from './CreatePatientService';
import FakePatientRepository from '../repositories/fakes/FakePatientRepository';

let fakePatientRepository: FakePatientRepository;
let createPatientService: CreatePatientService;
let showPatientService: ShowPatientService;

describe('ShowPatient', () => {
  beforeEach(() => {
    fakePatientRepository = new FakePatientRepository();

    createPatientService = new CreatePatientService(fakePatientRepository);
    showPatientService = new ShowPatientService(fakePatientRepository);
  });

  const email = faker.internet.email();
  it('should select an specific patient', async () => {
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

    expect(await showPatientService.execute(patient.id)).toBe(patient);
  });

  it('should be not able show a patient does not exist', async () => {
    return expect(showPatientService.execute(uuid())).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
