import { CategoryEnum } from "../../entities/enums/category.enum";
import { Vehicle } from "../../entities/vehicle.entity";
import { DomainException } from "../../exceptions/domain.exception";
import { IVehicleRepository } from "../../interfaces/repositories/vehiclerepository.interface";
import { PaginatedResponse } from "../../interfaces/shared/paginated-response.interface";

export class FindAllVehiclesUseCase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  async execute({
    query,
    category,
    page,
    limit,
  }: {
    query: string;
    category?: CategoryEnum;
    page: number;
    limit: number;
  }): Promise<PaginatedResponse<Vehicle>> {
    this.validateCategory(category);
    const offset = (page - 1) * limit;
    const numericLimit = parseInt(limit.toString(), 10);

    const data = await this.vehicleRepository.findAll({
      query,
      category,
      offset,
      limit: numericLimit,
    });

    const pages = Math.ceil(data.total / limit);

    return { ...data, page, pages, limit };
  }

  private validateCategory(category?: CategoryEnum): void {
    if (category && !Object.values(CategoryEnum).includes(category)) {
      throw new DomainException("Invalid category");
    }
  }
}
