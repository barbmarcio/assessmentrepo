import Router from 'express';
import ShopController from '@modules/shops/infra/http/controllers/ShopController';

const shopsRouter = Router();
const shopsController = new ShopController();

// Get all employees types
shopsRouter.get('/', shopsController.index);

// Get employee type by id
shopsRouter.get('/:id', shopsController.show);

// Create employee type
shopsRouter.post('/', shopsController.create);

// Update employee type
shopsRouter.put('/:id', shopsController.update);

// Delete employee type
shopsRouter.delete('/:id', shopsController.delete);

export default shopsRouter;
