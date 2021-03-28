import 'reflect-metadata';
import FakeEmployeesTypesRepository from '@modules/employees_types/repositories/fakes/FakeEmployeesTypesRepository';
import EmployeeTypeService from '@modules/employees_types/services/EmployeeTypeService';
import IEmployeesCreateDTO from '@modules/employees_types/dtos/IEmployeesTypesCreateDTO';
import AppError from '@shared/errors/AppError';

describe('Employee Types Tests', () => {
  it('should be able to create a new employee type', async () => {
    const fakeEmployeesTypesRepository = new FakeEmployeesTypesRepository();
    const employeeTypeService = new EmployeeTypeService(
      fakeEmployeesTypesRepository,
    );

    const data: IEmployeesCreateDTO = {
      name: 'Manager',
      salary: 100,
    };

    const newEmployeeType = await employeeTypeService.create(data);

    expect(newEmployeeType).toHaveProperty('id');
    expect(newEmployeeType.salary).toBe(100);
  });

  it('should be able to show all employees types', async () => {
    const fakeEmployeesTypesRepository = new FakeEmployeesTypesRepository();
    const employeeTypeService = new EmployeeTypeService(
      fakeEmployeesTypesRepository,
    );

    const employeesTypes = await employeeTypeService.getAll();

    expect(employeesTypes).toStrictEqual([]);
  });

  it('should be able to show an employee type filtered by the id', async () => {
    const fakeEmployeesTypesRepository = new FakeEmployeesTypesRepository();
    const employeeTypeService = new EmployeeTypeService(
      fakeEmployeesTypesRepository,
    );

    const data: IEmployeesCreateDTO = {
      name: 'Manager',
      salary: 100,
    };

    const newEmployeeType = await employeeTypeService.create(data);
    const foundEmployeeType = await employeeTypeService.getById(
      newEmployeeType.id,
    );

    expect(newEmployeeType).toHaveProperty('id');
  });

  it('should not be able to show an employee type filtered by the id that does not exists', async () => {
    const fakeEmployeesTypesRepository = new FakeEmployeesTypesRepository();
    const employeeTypeService = new EmployeeTypeService(
      fakeEmployeesTypesRepository,
    );

    expect(employeeTypeService.getById('100')).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update an existing employee type', async () => {
    const fakeEmployeesTypesRepository = new FakeEmployeesTypesRepository();
    const employeeTypeService = new EmployeeTypeService(
      fakeEmployeesTypesRepository,
    );

    const data: IEmployeesCreateDTO = {
      name: 'Manager',
      salary: 100,
    };

    const newEmployeeSalary = await employeeTypeService.create(data);
    data.salary = 50;
    const foundEmployeeType = await employeeTypeService.update(
      newEmployeeSalary.id,
      data,
    );

    expect(foundEmployeeType.salary).toBe(50);
  });

  it('should not be able to update a non existing employee type', async () => {
    const fakeEmployeesTypesRepository = new FakeEmployeesTypesRepository();
    const employeeTypeService = new EmployeeTypeService(
      fakeEmployeesTypesRepository,
    );

    const data: IEmployeesCreateDTO = {
      name: 'Manager',
      salary: 100,
    };

    expect(employeeTypeService.update('100', data)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should be able to delete an employee type', async () => {
    const fakeEmployeesTypesRepository = new FakeEmployeesTypesRepository();
    const employeeTypeService = new EmployeeTypeService(
      fakeEmployeesTypesRepository,
    );

    const data: IEmployeesCreateDTO = {
      name: 'Manager',
      salary: 100,
    };

    const newEmployeeType = await employeeTypeService.create(data);
    const deletedEmployeeType = await employeeTypeService.delete(
      newEmployeeType.id,
    );

    expect(deletedEmployeeType).toBe('Successfully deleted');
  });

  it('should not be able to delete a non existing employee type', async () => {
    const fakeEmployeesTypesRepository = new FakeEmployeesTypesRepository();
    const employeeTypeService = new EmployeeTypeService(
      fakeEmployeesTypesRepository,
    );

    expect(employeeTypeService.delete('100')).rejects.toBeInstanceOf(AppError);
  });
});
