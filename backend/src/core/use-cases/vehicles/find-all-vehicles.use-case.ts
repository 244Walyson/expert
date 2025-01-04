import { Vehicle } from "../../entities/vehicle.entity";
import { IVehicleRepository } from "../../interfaces/repositories/vehiclerepository.interface";
import { PaginatedResponse } from "../../interfaces/shared/paginated-response.interface";

export class FindAllVehiclesUseCase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  async execute({
    query,
    page,
    limit,
  }: {
    query: string;
    page: number;
    limit: number;
  }): Promise<PaginatedResponse<Vehicle>> {
    const offset = (page - 1) * limit;
    const numericLimit = parseInt(limit.toString(), 10);

    const data = await this.vehicleRepository.findAll({
      query,
      offset,
      limit: numericLimit,
    });

    return { ...data, page, limit };
  }
}
