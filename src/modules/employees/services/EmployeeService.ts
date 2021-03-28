import 'reflect-metadata';
import IShopsRepository from '@modules/shops/repositories/IShopsRepository';
import IEmployeesTypesRepository from '@modules/employees_types/repositories/IEmployeesTypesRepository';
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
      throw new AppError('The employee with this ID is not registered.', 400);

    return foundEmployee;
  }

  public async create(data: IEmployeesCreateDTO): Promise<Employee> {
    /* Some validations before creating the user
    const checkIfShopExists = await this.shopRepository.getById(data.shop_id);
    if (!checkIfShopExists)
      throw new AppError('Provided shop does not exist', 400);

    const checkIfTypeExists = await this.employeeTypeRepository.getById(
      data.type_id,
    );
    if (!checkIfTypeExists)
      throw new AppError('Provided employee type does not exist', 400);
    */

    // I've removed them so I can seek a bit more of how to implement another
    // dependencies without breaking SOLID principles

    const newEmployee = await this.employeeRepository.create(data);

    return newEmployee;
  }

  public async update(
    id: string,
    data: IEmployeesCreateDTO,
  ): Promise<Employee> {
    const checkIfExists = await this.employeeRepository.getById(id);
    if (!checkIfExists)
      throw new AppError('The employee with this ID is not registered.', 400);

    const updatedEmployee = await this.employeeRepository.update(id, data);

    return updatedEmployee;
  }

  public async delete(id: string): Promise<string> {
    const checkIfExists = await this.employeeRepository.getById(id);
    if (!checkIfExists)
      throw new AppError('The employee with this ID is not registered.', 400);

    const deleteEmployee = await this.employeeRepository.delete(id);

    return 'Successfully deleted';
  }
}

export default EmployeeService;
