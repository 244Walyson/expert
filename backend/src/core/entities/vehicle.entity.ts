import { Brand } from "./brand.entity";
import { CategoryEnum } from "./enums/category.enum";

export class Vehicle {
  id?: number;
  name!: string;
  plate!: string;
  imgUrl: string | null = null;
  category!: CategoryEnum;
  brand!: Brand;

  constructor(vehicle: Partial<Vehicle>) {
    Object.assign(this, vehicle);
    this.plate = this.plate.toUpperCase();
  }
}
