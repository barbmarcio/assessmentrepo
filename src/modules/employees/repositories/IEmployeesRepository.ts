import IEmployeesCreateDTO from '@modules/employees/dtos/IEmployeesCreateDTO';
import Employee from '@modules/employees/infra/typeorm/entities/Employee';

export default interface IEmployeesRepository {
  create(data: IEmployeesCreateDTO): Promise<Employee>;
  getAll(): Promise<Employee | undefined>;
  getById(id: string): Promise<Employee | undefined>;
  update(id: string, data: IEmployeesCreateDTO): Promise<Employee>;
  delete(id: string): Promise<void>;
}
