import { Brand } from "./brand.entity";
import { CategoryEnum } from "./enums/category.enum";

export class Vehicle {
  id?: number;
  name!: string;
  plate!: string;
  category!: CategoryEnum;
  brand!: Brand;

  constructor(vehicle: Partial<Vehicle>) {
    Object.assign(this, vehicle);
  }
}
