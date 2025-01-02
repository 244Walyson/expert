import { Vehicle } from "../../entities/vehicle.entity";
import { IVehicleRepository } from "../../interfaces/vehiclerepository.interface";

export class FindAllVehiclesUseCase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  async execute(): Promise<Vehicle[]> {
    return await this.vehicleRepository.findAll();
  }
}
