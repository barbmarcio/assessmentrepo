import { Repository, getRepository } from 'typeorm';

import IEmployeesTypesRepository from '@modules/employees_types/repositories/IEmployeesTypesRepository';
import IEmployeesTypesCreateDTO from '@modules/employees_types/dtos/IEmployeesTypesCreateDTO';
import EmployeeType from '@modules/employees_types/infra/typeorm/entities/EmployeeType';

class EmployeesTypesRepository implements IEmployeesTypesRepository {
  private ormRepository: Repository<EmployeeType>;

  constructor() {
    this.ormRepository = getRepository(EmployeeType);
  }

  public async create(data: IEmployeesTypesCreateDTO): Promise<EmployeeType> {
    const newEmployeeType = this.ormRepository.create(data);
    await this.ormRepository.save(newEmployeeType);

    return newEmployeeType;
  }

  public async getAll(): Promise<any> {
    const foundEmployeesTypes = await this.ormRepository.find();

    return foundEmployeesTypes;
  }

  public async getById(id: string): Promise<EmployeeType | undefined> {
    const foundEmployeeType = await this.ormRepository.findOne(id);

    return foundEmployeeType;
  }

  public async update(
    id: string,
    data: IEmployeesTypesCreateDTO,
  ): Promise<EmployeeType> {
    const updatedEmployeeType = await this.ormRepository.save({
      id,
      name: data.name,
      salary: data.salary,
    });

    return updatedEmployeeType;
  }

  public async delete(id: string): Promise<void> {
    const deletingEmployeeType = await this.ormRepository.delete(id);
  }
}

export default EmployeesTypesRepository;
