import { uuid } from 'uuidv4';
import IShopsRepository from '@modules/shops/repositories/IShopsRepository';
import IShopsCreateDTO from '@modules/shops/dtos/IShopsCreateDTO';
import Shop from '@modules/shops/infra/typeorm/entities/Shop';

class ShopsRepository implements IShopsRepository {
  private shops: Shop[] = [];

  public async create(data: IShopsCreateDTO): Promise<Shop> {
    const newShop = new Shop();

    Object.assign(
      newShop,
      {
        id: uuid(),
      },
      data,
    );

    this.shops.push(newShop);

    return newShop;
  }

  public async getAll(): Promise<any> {
    return this.shops;
  }

  public async getById(id: string): Promise<Shop | undefined> {
    const foundShop = this.shops.find(shop => shop.id === id);
    return foundShop;
  }

  public async update(id: string, data: IShopsCreateDTO): Promise<Shop> {
    const foundIndex = this.shops.findIndex(foundShop => foundShop.id === id);
    const foundShop = this.shops[foundIndex];

    this.shops[foundIndex].telephone = data.telephone;

    return foundShop;
  }

  public async delete(id: string): Promise<void> {
    const foundIndex = this.shops.findIndex(foundShop => foundShop.id === id);

    this.shops.splice(foundIndex, 1);
  }
}

export default ShopsRepository;
