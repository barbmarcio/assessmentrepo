import { Repository, getRepository } from 'typeorm';

import IShopsRepository from '@modules/shops/repositories/IShopsRepository';
import ShopsCreateDTO from '@modules/shops/dtos/IShopsCreateDTO';
import Shop from '@modules/shops/infra/typeorm/entities/Shop';

class ShopsRepository implements IShopsRepository {
  private ormRepository: Repository<Shop>;

  constructor() {
    this.ormRepository = getRepository(Shop);
  }

  public async create(data: ShopsCreateDTO): Promise<Shop> {
    const newShop = this.ormRepository.create(data);
    await this.ormRepository.save(newShop);

    return newShop;
  }

  public async getAll(): Promise<any> {
    const foundShop = await this.ormRepository.find();

    return foundShop;
  }

  public async getById(id: string): Promise<Shop | undefined> {
    const foundShop = await this.ormRepository.findOne(id);

    return foundShop;
  }

  public async update(id: string, data: ShopsCreateDTO): Promise<Shop> {
    const updatedShop = await this.ormRepository.save({
      id,
      name: data.name,
      address: data.address,
      telephone: data.telephone,
    });

    return updatedShop;
  }

  public async delete(id: string): Promise<void> {
    const deletingShop = await this.ormRepository.delete(id);
  }
}

export default ShopsRepository;
