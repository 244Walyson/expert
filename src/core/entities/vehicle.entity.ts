import { Brand } from "./brand.entity";

export class Vehicle {
  id?: number;
  name!: string;
  plate!: string;
  brand!: Brand;

  constructor(vehicle: Partial<Vehicle>) {
    Object.assign(this, vehicle);
  }
}
