import 'reflect-metadata';
import IEmployeesTypesRepository from '@modules/employees_types/repositories/IEmployeesTypesRepository';
import IEmployeesTypesCreateDTO from '@modules/employees_types/dtos/IEmployeesTypesCreateDTO';
import EmployeeType from '@modules/employees_types/infra/typeorm/entities/EmployeeType';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

@injectable()
class EmployeeService {
  constructor(
    @inject('EmployeesTypesRepository')
    private employeeTypeRepository: IEmployeesTypesRepository,
  ) {}

  public async getAll(): Promise<EmployeeType | any> {
    const employees = await this.employeeTypeRepository.getAll();

    return employees;
  }

  public async getById(id: string): Promise<EmployeeType | any> {
    const foundEmployee = await this.employeeTypeRepository.getById(id);
    if (!foundEmployee)
      throw new AppError('The employee type with this ID is not registered.');

    return foundEmployee;
  }

  public async create(data: IEmployeesTypesCreateDTO): Promise<EmployeeType> {
    const newEmployee = await this.employeeTypeRepository.create(data);

    return newEmployee;
  }

  public async update(
    id: string,
    data: IEmployeesTypesCreateDTO,
  ): Promise<EmployeeType> {
    const checkIfExists = await this.employeeTypeRepository.getById(id);
    if (!checkIfExists)
      throw new AppError('The employee type with this ID is not registered.');

    const updatedEmployee = await this.employeeTypeRepository.update(id, data);

    return updatedEmployee;
  }

  public async delete(id: string): Promise<string> {
    const checkIfExists = await this.employeeTypeRepository.getById(id);
    if (!checkIfExists)
      throw new AppError('The employee type with this ID is not registered.');

    const deleteEmployee = await this.employeeTypeRepository.delete(id);

    return 'Successfully deleted';
  }
}

export default EmployeeService;
