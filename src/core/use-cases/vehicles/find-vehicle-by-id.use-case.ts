import { Vehicle } from "../../entities/vehicle.entity";
import { ResourceNotFoundException } from "../../exceptions/resource-not-found.exception";
import { IVehicleRepository } from "../../interfaces/repositories/vehiclerepository.interface";

export class FindVehicleByIdUseCase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  async execute(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findById(+id);

    if (!vehicle) {
      throw new ResourceNotFoundException("Vehicle not found");
    }

    return vehicle;
  }
}
