import Router from 'express';
import EmployeeController from '@modules/employees/infra/http/controllers/EmployeeController';

const employeesRouter = Router();
const employeeController = new EmployeeController();

// Get all employees
employeesRouter.get('/', employeeController.index, () => {
  return Promise.reject().catch(err => {
    throw new Error(err);
  });
});

// Get employee by id
employeesRouter.get('/:id', employeeController.show);

// Create employee
employeesRouter.post('/', employeeController.create);

// Update employee
employeesRouter.put('/:id', employeeController.update);

// Delete employee
employeesRouter.delete('/:id', employeeController.delete);

export default employeesRouter;
