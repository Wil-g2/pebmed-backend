import 'reflect-metadata';
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
        name: 'Willian',
        phone: '+553555555555',
        email: 'will@teste.com',
        birth_date: new Date('2000-01-01'),
        gender: 1,
        height: 75.6,
        weight: 80,
      }),
      await createPatientService.execute({
        name: 'Willian',
        phone: '+553555555555',
        email: 'will1@teste.com',
        birth_date: new Date('2000-01-01'),
        gender: 1,
        height: 75.6,
        weight: 80,
      }),
    ];

    expect(await showAllPatientService.execute()).toEqual(patients);
  });
});
