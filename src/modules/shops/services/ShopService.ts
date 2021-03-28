import 'reflect-metadata';
import IShopsRepository from '@modules/shops/repositories/IShopsRepository';
import IShopsCreateDTO from '@modules/shops/dtos/IShopsCreateDTO';
import Shop from '@modules/shops/infra/typeorm/entities/Shop';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

@injectable()
class ShopService {
  constructor(
    @inject('ShopsRepository')
    private shopRepository: IShopsRepository,
  ) {}

  public async getAll(): Promise<Shop | any> {
    const shops = await this.shopRepository.getAll();
    return shops;
  }

  public async getById(id: string): Promise<Shop | any> {
    const foundShops = await this.shopRepository.getById(id);
    if (!foundShops)
      throw new AppError('The shop with this ID is not registered.');

    return foundShops;
  }

  public async create(data: IShopsCreateDTO): Promise<Shop> {
    const newShop = await this.shopRepository.create(data);

    return newShop;
  }

  public async update(id: string, data: IShopsCreateDTO): Promise<Shop> {
    const checkIfExists = await this.shopRepository.getById(id);
    if (!checkIfExists)
      throw new AppError('The shop with this ID is not registered.');

    const updatedShop = await this.shopRepository.update(id, data);

    return updatedShop;
  }

  public async delete(id: string): Promise<string> {
    const checkIfExists = await this.shopRepository.getById(id);
    if (!checkIfExists)
      throw new AppError('The shop with this ID is not registered.');

    const deleteShop = await this.shopRepository.delete(id);

    return 'Successfully deleted';
  }
}

export default ShopService;
