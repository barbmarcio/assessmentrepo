import 'reflect-metadata';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import EmployeeTypeService from '@modules/employees_types/services/EmployeeTypeService';

class EmployeeTypeController {
  public async index(req: Request, res: Response): Promise<Response> {
    const employeeTypeService = container.resolve(EmployeeTypeService);
    const employeesTypes = await employeeTypeService.getAll();

    return res.json(employeesTypes);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const employeeTypeService = container.resolve(EmployeeTypeService);
    const foundEmployeeType = await employeeTypeService.getById(id);

    return res.json(foundEmployeeType);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const employeeTypeService = container.resolve(EmployeeTypeService);
    const newEmployeeType = await employeeTypeService.create(data);

    return res.json(newEmployeeType);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const data = req.body;

    const employeeTypeService = container.resolve(EmployeeTypeService);
    const updatedEmployeeType = await employeeTypeService.update(id, data);

    return res.json(updatedEmployeeType);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const employeeTypeService = container.resolve(EmployeeTypeService);
    const deleteEmployeeType = await employeeTypeService.delete(id);

    return res.json(deleteEmployeeType);
  }
}

export default EmployeeTypeController;
