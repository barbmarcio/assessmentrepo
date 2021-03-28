import IShopsCreateDTO from '@modules/shops/dtos/IShopsCreateDTO';
import Shop from '@modules/shops/infra/typeorm/entities/Shop';

export default interface IShopsRepository {
  create(data: IShopsCreateDTO): Promise<Shop>;
  getAll(): Promise<Shop | undefined>;
  getById(id: string): Promise<Shop | undefined>;
  update(id: string, data: IShopsCreateDTO): Promise<Shop>;
  delete(id: string): Promise<void>;
}
