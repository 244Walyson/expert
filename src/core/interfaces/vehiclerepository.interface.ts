import { Vehicle } from "../entities/vehicle.entity";

export interface IVehicleRepository {
  findById(id: number): Promise<Vehicle | null>;
  create(vehicle: Vehicle): Promise<Vehicle>;
  update(vehicle: Vehicle): Promise<Vehicle>;
  delete(id: number): Promise<void>;
}
