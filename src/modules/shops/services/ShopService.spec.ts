import 'reflect-metadata';
import FakeShopsRepository from '@modules/shops/repositories/fakes/FakeShopsRepository';
import ShopService from '@modules/shops/services/ShopService';
import IShopsCreateDTO from '@modules/shops/dtos/IShopsCreateDTO';
import AppError from '@shared/errors/AppError';

describe('Employee Types Tests', () => {
  it('should be able to create a new shop', async () => {
    const fakeShopsRepository = new FakeShopsRepository();
    const shopServicee = new ShopService(fakeShopsRepository);

    const data: IShopsCreateDTO = {
      name: 'Manager',
      address: 'Teste, 123',
      telephone: '1',
    };

    const newShop = await shopServicee.create(data);

    expect(newShop).toHaveProperty('id');
    expect(newShop.telephone).toBe('1');
  });

  it('should be able to show all shops', async () => {
    const fakeShopsRepository = new FakeShopsRepository();
    const shopServicee = new ShopService(fakeShopsRepository);

    const foundShops = await shopServicee.getAll();

    expect(foundShops).toStrictEqual([]);
  });

  it('should be able to show a shop filtered by the id', async () => {
    const fakeShopsRepository = new FakeShopsRepository();
    const shopServicee = new ShopService(fakeShopsRepository);

    const data: IShopsCreateDTO = {
      name: 'Manager',
      address: 'Teste, 123',
      telephone: '1',
    };

    const newShop = await shopServicee.create(data);
    const foundShop = await shopServicee.getById(newShop.id);

    expect(newShop).toHaveProperty('id');
  });

  it('should not be able to show a shop filtered by the id that does not exists', async () => {
    const fakeShopsRepository = new FakeShopsRepository();
    const shopServicee = new ShopService(fakeShopsRepository);

    expect(shopServicee.getById('100')).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update an existing shop', async () => {
    const fakeShopsRepository = new FakeShopsRepository();
    const shopServicee = new ShopService(fakeShopsRepository);

    const data: IShopsCreateDTO = {
      name: 'Manager',
      address: 'Teste, 123',
      telephone: '1',
    };

    const newShop = await shopServicee.create(data);
    data.telephone = '456';
    const foundShop = await shopServicee.update(newShop.id, data);

    expect(foundShop.telephone).toBe('456');
  });

  it('should not be able to update a non existing shop', async () => {
    const fakeShopsRepository = new FakeShopsRepository();
    const shopServicee = new ShopService(fakeShopsRepository);

    const data: IShopsCreateDTO = {
      name: 'Manager',
      address: 'Teste, 123',
      telephone: '1',
    };

    expect(shopServicee.update('100', data)).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete a shop', async () => {
    const fakeShopsRepository = new FakeShopsRepository();
    const shopServicee = new ShopService(fakeShopsRepository);

    const data: IShopsCreateDTO = {
      name: 'Manager',
      address: 'Teste, 123',
      telephone: '1',
    };

    const newShop = await shopServicee.create(data);
    const deletedShop = await shopServicee.delete(newShop.id);

    expect(deletedShop).toBe('Successfully deleted');
  });

  it('should not be able to delete a non existing shop', async () => {
    const fakeShopsRepository = new FakeShopsRepository();
    const shopService = new ShopService(fakeShopsRepository);

    expect(shopService.delete('100')).rejects.toBeInstanceOf(AppError);
  });
});
