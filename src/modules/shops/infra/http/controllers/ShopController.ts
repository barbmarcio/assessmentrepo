import 'reflect-metadata';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShopService from '@modules/shops/services/ShopService';

class ShopController {
  public async index(req: Request, res: Response): Promise<Response> {
    const shopService = container.resolve(ShopService);
    const foundShops = await shopService.getAll();

    return res.json(foundShops);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const shopService = container.resolve(ShopService);
    const foundShop = await shopService.getById(id);

    return res.json(foundShop);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const shopService = container.resolve(ShopService);
    const newShop = await shopService.create(data);

    return res.json(newShop);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const data = req.body;

    const shopService = container.resolve(ShopService);
    const updatedShop = await shopService.update(id, data);

    return res.json(updatedShop);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const shopService = container.resolve(ShopService);
    const deletedShop = await shopService.delete(id);

    return res.json(deletedShop);
  }
}

export default ShopController;
