import employeesRouter from '@modules/employees/infra/http/routes/employee.router';
import employeesTypesRouter from '@modules/employees_types/infra/http/routes/employeetypes.router';
import shopsRouter from '@modules/shops/infra/http/routes/shop.router';

import Router from 'express';

const router = Router();

router.use('/employees', employeesRouter);
router.use('/employees-types', employeesTypesRouter);
router.use('/shops', shopsRouter);

export default router;
