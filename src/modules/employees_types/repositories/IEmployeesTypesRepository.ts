import IEmployeesTypesCreateDTO from '@modules/employees_types/dtos/IEmployeesTypesCreateDTO';
import EmployeeType from '@modules/employees_types/infra/typeorm/entities/EmployeeType';

export default interface IEmployeesRepository {
  create(data: IEmployeesTypesCreateDTO): Promise<EmployeeType>;
  getAll(): Promise<EmployeeType | undefined>;
  getById(id: string): Promise<EmployeeType | undefined>;
  update(id: string, data: IEmployeesTypesCreateDTO): Promise<EmployeeType>;
  delete(id: string): Promise<void>;
}
