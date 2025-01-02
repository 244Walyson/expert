import { Brand } from "../entities/brand.entity";

export interface IBrandRepository {
  findByName(name: string): Promise<Brand | null>;
  create(brand: Brand): Promise<Brand>;
}
