import 'reflect-metadata';
import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import IEmployeesCreateDTO from '@modules/employees/dtos/IEmployeesCreateDTO';
import Employee from '@modules/employees/infra/typeorm/entities/Employee';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

@injectable()
class EmployeeService {
  constructor(
    @inject('EmployeesRepository')
    private employeeRepository: IEmployeesRepository,
  ) {}

  public async getAll(): Promise<Employee | any> {
    const employees = await this.employeeRepository.getAll();

    return employees;
  }

  public async getById(id: string): Promise<Employee | any> {
    const foundEmployee = await this.employeeRepository.getById(id);
    if (!foundEmployee)
      throw new AppError('The employee with this ID is not registered.');

    return foundEmployee;
  }

  public async create(data: IEmployeesCreateDTO): Promise<Employee> {
    const newEmployee = await this.employeeRepository.create(data);

    return newEmployee;
  }

  public async update(
    id: string,
    data: IEmployeesCreateDTO,
  ): Promise<Employee> {
    const checkIfExists = await this.employeeRepository.getById(id);
    if (!checkIfExists)
      throw new AppError('The employee with this ID is not registered.');

    const updatedEmployee = await this.employeeRepository.update(id, data);

    return updatedEmployee;
  }

  public async delete(id: string): Promise<string> {
    const checkIfExists = await this.employeeRepository.getById(id);
    if (!checkIfExists)
      throw new AppError('The employee with this ID is not registered.');

    const deleteEmployee = await this.employeeRepository.delete(id);

    return 'Successfully deleted';
  }
}

export default EmployeeService;
