import Router from 'express';
import EmployeeTypeController from '@modules/employees_types/infra/http/controllers/EmployeeTypeController';

const employeesTypesRouter = Router();
const employeeTypesController = new EmployeeTypeController();

// Get all employees types
employeesTypesRouter.get('/', employeeTypesController.index);

// Get employee type by id
employeesTypesRouter.get('/:id', employeeTypesController.show);

// Create employee type
employeesTypesRouter.post('/', employeeTypesController.create);

// Update employee type
employeesTypesRouter.put('/:id', employeeTypesController.update);

// Delete employee type
employeesTypesRouter.delete('/:id', employeeTypesController.delete);

export default employeesTypesRouter;
