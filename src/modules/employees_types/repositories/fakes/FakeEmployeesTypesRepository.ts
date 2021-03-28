import { uuid } from 'uuidv4';
import IEmployeesTypesRepository from '@modules/employees_types/repositories/IEmployeesTypesRepository';
import IEmployeesTypesCreateDTO from '@modules/employees_types/dtos/IEmployeesTypesCreateDTO';
import EmployeeType from '@modules/employees_types/infra/typeorm/entities/EmployeeType';

class EmployeesTypesRepository implements IEmployeesTypesRepository {
  private employeesTypes: EmployeeType[] = [];

  public async create(data: IEmployeesTypesCreateDTO): Promise<EmployeeType> {
    const newEmployeeType = new EmployeeType();

    Object.assign(
      newEmployeeType,
      {
        id: uuid(),
      },
      data,
    );

    this.employeesTypes.push(newEmployeeType);

    return newEmployeeType;
  }

  public async getAll(): Promise<any> {
    return this.employeesTypes;
  }

  public async getById(id: string): Promise<EmployeeType | undefined> {
    const foundEmployee = this.employeesTypes.find(
      employeetype => employeetype.id === id,
    );
    return foundEmployee;
  }

  public async update(
    id: string,
    data: IEmployeesTypesCreateDTO,
  ): Promise<EmployeeType> {
    const foundIndex = this.employeesTypes.findIndex(
      foundEmployeeType => foundEmployeeType.id === id,
    );
    const foundEmployeeType = this.employeesTypes[foundIndex];

    this.employeesTypes[foundIndex].salary = data.salary;

    return foundEmployeeType;
  }

  public async delete(id: string): Promise<void> {
    const foundIndex = this.employeesTypes.findIndex(
      foundEmployeeType => foundEmployeeType.id === id,
    );

    this.employeesTypes.splice(foundIndex, 1);
  }
}

export default EmployeesTypesRepository;
