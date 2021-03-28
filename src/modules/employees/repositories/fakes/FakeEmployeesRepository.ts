import { uuid } from 'uuidv4';
import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import IEmployeesCreateDTO from '@modules/employees/dtos/IEmployeesCreateDTO';
import Employee from '@modules/employees/infra/typeorm/entities/Employee';

class EmployeesRepository implements IEmployeesRepository {
  private employees: Employee[] = [];

  public async create(data: IEmployeesCreateDTO): Promise<Employee> {
    const newEmployee = new Employee();

    Object.assign(
      newEmployee,
      {
        id: uuid(),
      },
      data,
    );

    this.employees.push(newEmployee);

    return newEmployee;
  }

  public async getAll(): Promise<any> {
    return this.employees;
  }

  public async getById(id: string): Promise<Employee | undefined> {
    const foundEmployee = this.employees.find(employee => employee.id === id);
    return foundEmployee;
  }

  public async update(
    id: string,
    data: IEmployeesCreateDTO,
  ): Promise<Employee> {
    const foundIndex = this.employees.findIndex(
      foundEmployee => foundEmployee.id === id,
    );
    const foundEmployee = this.employees[foundIndex];

    this.employees[foundIndex].telephone = data.telephone;

    return foundEmployee;
  }

  public async delete(id: string): Promise<void> {
    const foundIndex = this.employees.findIndex(
      foundEmployee => foundEmployee.id === id,
    );

    this.employees.splice(foundIndex, 1);
  }
}

export default EmployeesRepository;
