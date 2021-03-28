import { Repository, getRepository } from 'typeorm';

import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import IEmployeesCreateDTO from '@modules/employees/dtos/IEmployeesCreateDTO';
import Employee from '@modules/employees/infra/typeorm/entities/Employee';

class EmployeesRepository implements IEmployeesRepository {
  private ormRepository: Repository<Employee>;

  constructor() {
    this.ormRepository = getRepository(Employee);
  }

  public async create(data: IEmployeesCreateDTO): Promise<Employee> {
    const newEmployee = this.ormRepository.create(data);
    await this.ormRepository.save(newEmployee);

    return newEmployee;
  }

  public async getAll(): Promise<any> {
    const foundEmployees = await this.ormRepository.find();

    return foundEmployees;
  }

  public async getById(id: string): Promise<Employee | undefined> {
    const foundEmployee = await this.ormRepository.findOne(id);

    return foundEmployee;
  }

  public async update(
    id: string,
    data: IEmployeesCreateDTO,
  ): Promise<Employee> {
    const updatedEmployee = await this.ormRepository.save({
      id,
      name: data.name,
      address: data.address,
      employment_date: data.employment_date,
      telephone: data.telephone,
      type_id: data.type_id,
      shop_id: data.shop_id,
    });

    return updatedEmployee;
  }

  public async delete(id: string): Promise<void> {
    const deletingEmployee = await this.ormRepository.delete(id);
  }
}

export default EmployeesRepository;
