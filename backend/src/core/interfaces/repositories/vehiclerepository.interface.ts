import { CategoryEnum } from "../../entities/enums/category.enum";
import { Vehicle } from "../../entities/vehicle.entity";
import { PaginatedResponse } from "../shared/paginated-response.interface";

export interface IVehicleRepository {
  findById(id: number): Promise<Vehicle | null>;
  findAll({
    query,
    category,
    offset,
    limit,
  }: {
    query: string;
    category?: CategoryEnum;
    offset: number;
    limit: number;
  }): Promise<PaginatedResponse<Vehicle>>;
  create(vehicle: Vehicle): Promise<Vehicle>;
  update(id: number, vehicle: Vehicle): Promise<Vehicle>;
  delete(id: number): Promise<void>;
  findByPlate(plate: string): Promise<Vehicle | null>;
}
