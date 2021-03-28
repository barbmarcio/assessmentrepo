import 'reflect-metadata';
import FakeEmployeesRepository from '@modules/employees/repositories/fakes/FakeEmployeesRepository';
import EmployeeService from '@modules/employees/services/EmployeeService';
import IEmployeesCreateDTO from '@modules/employees/dtos/IEmployeesCreateDTO';
import AppError from '@shared/errors/AppError';

describe('Employee Tests', () => {
  it('should be able to create a new employee', async () => {
    const fakeEmployeesRepository = new FakeEmployeesRepository();
    const employeeService = new EmployeeService(fakeEmployeesRepository);

    const data: IEmployeesCreateDTO = {
      name: 'Marcio',
      address: 'Test, 123',
      telephone: '1',
      employment_date: new Date(),
      shop_id: '1',
      type_id: '1',
    };

    const newEmployee = await employeeService.create(data);

    expect(newEmployee).toHaveProperty('id');
    expect(newEmployee.telephone).toBe('1');
  });

  it('should be able to show all employees', async () => {
    const fakeEmployeesRepository = new FakeEmployeesRepository();
    const employeeService = new EmployeeService(fakeEmployeesRepository);

    const employees = await employeeService.getAll();

    expect(employees).toStrictEqual([]);
  });

  it('should be able to show an employee filtered by the id', async () => {
    const fakeEmployeesRepository = new FakeEmployeesRepository();
    const employeeService = new EmployeeService(fakeEmployeesRepository);

    const data: IEmployeesCreateDTO = {
      name: 'Marcio',
      address: 'Test, 123',
      telephone: '1',
      employment_date: new Date(),
      shop_id: '1',
      type_id: '1',
    };

    const newEmployee = await employeeService.create(data);
    const foundEmployee = await employeeService.getById(newEmployee.id);

    expect(newEmployee).toHaveProperty('id');
  });

  it('should not be able to show an employee filtered by the id that does not exists', async () => {
    const fakeEmployeesRepository = new FakeEmployeesRepository();
    const employeeService = new EmployeeService(fakeEmployeesRepository);

    expect(employeeService.getById('100')).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update an existing employee', async () => {
    const fakeEmployeesRepository = new FakeEmployeesRepository();
    const employeeService = new EmployeeService(fakeEmployeesRepository);

    const data: IEmployeesCreateDTO = {
      name: 'Marcio',
      address: 'Test, 123',
      telephone: '1',
      employment_date: new Date(),
      shop_id: '1',
      type_id: '1',
    };

    const newEmployee = await employeeService.create(data);
    data.telephone = '456789';
    const foundEmployee = await employeeService.update(newEmployee.id, data);

    expect(foundEmployee.telephone).toBe('456789');
  });

  it('should not be able to update a non existing employee', async () => {
    const fakeEmployeesRepository = new FakeEmployeesRepository();
    const employeeService = new EmployeeService(fakeEmployeesRepository);

    const data: IEmployeesCreateDTO = {
      name: 'Marcio',
      address: 'Test, 123',
      telephone: '1',
      employment_date: new Date(),
      shop_id: '1',
      type_id: '1',
    };

    expect(employeeService.update('100', data)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should be able to delete an employee', async () => {
    const fakeEmployeesRepository = new FakeEmployeesRepository();
    const employeeService = new EmployeeService(fakeEmployeesRepository);

    const data: IEmployeesCreateDTO = {
      name: 'Marcio',
      address: 'Test, 123',
      telephone: '1',
      employment_date: new Date(),
      shop_id: '1',
      type_id: '1',
    };

    const newEmployee = await employeeService.create(data);
    const deletedEmployee = await employeeService.delete(newEmployee.id);

    expect(deletedEmployee).toBe('Successfully deleted');
  });

  it('should not be able to delete a non existing employee', async () => {
    const fakeEmployeesRepository = new FakeEmployeesRepository();
    const employeeService = new EmployeeService(fakeEmployeesRepository);

    expect(employeeService.delete('100')).rejects.toBeInstanceOf(AppError);
  });
});
