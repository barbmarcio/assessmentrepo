import { container } from 'tsyringe';

import EmployeesRepository from '@modules/employees/infra/typeorm/repositories/EmployeesRepository';
import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';

import EmployeesTypesRepository from '@modules/employees_types/repositories/fakes/FakeEmployeesTypesRepository';
import IEmployeesTypesRepository from '@modules/employees_types/repositories/IEmployeesTypesRepository';

import ShopsRepository from '@modules/shops/infra/typeorm/repositories/EmployeesTypesRepository';
import IShopsRepository from '@modules/shops/repositories/IShopsRepository';

container.registerSingleton<IEmployeesRepository>(
  'EmployeesRepository',
  EmployeesRepository,
);

container.registerSingleton<IEmployeesTypesRepository>(
  'EmployeesTypesRepository',
  EmployeesTypesRepository,
);

container.registerSingleton<IShopsRepository>(
  'ShopsRepository',
  ShopsRepository,
);
