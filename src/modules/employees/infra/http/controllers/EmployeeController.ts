import 'reflect-metadata';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import EmployeeService from '@modules/employees/services/EmployeeService';

class EmployeeController {
  public async index(req: Request, res: Response): Promise<Response> {
    const employeeService = container.resolve(EmployeeService);
    const employees = await employeeService.getAll();

    return res.json(employees);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const employeeService = container.resolve(EmployeeService);
    const foundEmployees = await employeeService.getById(id);

    return res.json(foundEmployees);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const employeeService = container.resolve(EmployeeService);
    const newEmployee = await employeeService.create(data);

    return res.json(newEmployee);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const data = req.body;

    const employeeService = container.resolve(EmployeeService);
    const updatedEmployee = await employeeService.update(id, data);

    return res.json(updatedEmployee);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const employeeService = container.resolve(EmployeeService);
    const deleteEmployee = await employeeService.delete(id);

    return res.json(deleteEmployee);
  }
}

export default EmployeeController;
