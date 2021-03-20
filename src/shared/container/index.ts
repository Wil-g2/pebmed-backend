import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import IPatientRepository from '@modules/patient/repositories/IPatientRepository';
import PatientRepository from '@modules/patient/infra/typeorm/repositories/PatientRepository';
import IScheduleRepository from '@modules/schedule/repositories/IScheduleRepository';
import ScheduleRepository from '@modules/schedule/infra/typeorm/repositories/ScheduleRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UserRepository,
);

container.registerSingleton<IScheduleRepository>(
  'ScheduleRepository',
  ScheduleRepository,
);

container.registerSingleton<IPatientRepository>(
  'PatientRepository',
  PatientRepository,
);
