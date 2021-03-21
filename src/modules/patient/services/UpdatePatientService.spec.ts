import 'reflect-metadata';
import { v4 as uuid } from 'uuid';
import * as faker from 'faker';
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

  const email = faker.internet.email();

  it('should update an specific patient', async () => {
    const patient = await createPatientService.execute({
      name: faker.name.firstName(1),
      phone: faker.phone.phoneNumberFormat(),
      email,
      birth_date: faker.date.past(),
      gender: 1,
      height: faker.random.float(),
      weight: faker.random.float(),
    });

    const newPatient = {
      id: patient.id,
      name: faker.name.firstName(1),
      phone: faker.phone.phoneNumberFormat(),
      email,
      birth_date: faker.date.past(),
      gender: 1,
      height: faker.random.float(),
      weight: faker.random.float(),
    };

    expect(patient).toHaveProperty('id');
    expect(patient.email).toBe(email);

    expect(await updatePatientService.execute(newPatient)).toEqual(newPatient);
  });

  it('should be not able update a patient does not exist', async () => {
    return expect(
      updatePatientService.execute({
        id: uuid(),
        name: faker.name.firstName(1),
        phone: faker.phone.phoneNumberFormat(),
        email: faker.internet.email(),
        birth_date: faker.date.past(),
        gender: 1,
        height: faker.random.float(),
        weight: faker.random.float(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
