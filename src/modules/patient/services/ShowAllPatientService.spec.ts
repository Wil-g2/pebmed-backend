import 'reflect-metadata';
import * as faker from 'faker';
import ShowAllPatientService from './ShowAllPatientService';
import CreatePatientService from './CreatePatientService';
import FakePatientRepository from '../repositories/fakes/FakePatientRepository';
import Patient from '../infra/typeorm/entities/Patient';
// let fakePatientRepository: FakePatientRepository;
// let createPatientService: CreatePatientService;
// let showAllPatientService: ShowAllPatientService;

describe('ShowAllPatients', () => {
  // beforeEach(() => {
  //   fakePatientRepository = new FakePatientRepository();
  //   createPatientService = new CreatePatientService(fakePatientRepository);
  //   showAllPatientService = new ShowAllPatientService(fakePatientRepository);
  // });

  it('should list all patients', async () => {
    const fakePatientRepository = new FakePatientRepository();
    const createPatientService = new CreatePatientService(
      fakePatientRepository,
    );
    const showAllPatientService = new ShowAllPatientService(
      fakePatientRepository,
    );
    const patients: Patient[] = [
      await createPatientService.execute({
        name: faker.name.firstName(1),
        phone: faker.phone.phoneNumberFormat(),
        email: faker.internet.email(),
        birth_date: new Date('2000-01-01'),
        gender: 1,
        height: faker.random.float(),
        weight: faker.random.float(),
      }),
      await createPatientService.execute({
        name: faker.name.firstName(1),
        phone: faker.phone.phoneNumberFormat(),
        email: faker.internet.email(),
        birth_date: new Date('2000-01-01'),
        gender: 1,
        height: faker.random.float(),
        weight: faker.random.float(),
      }),
    ];

    expect(await showAllPatientService.execute()).toEqual(patients);
  });
});
