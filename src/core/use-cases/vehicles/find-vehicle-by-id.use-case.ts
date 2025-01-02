import { Vehicle } from "../../entities/vehicle.entity";
import { IVehicleRepository } from "../../interfaces/vehiclerepository.interface";

export class FindVehicleByIdUseCase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  async execute(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findById(+id);

    if (!vehicle) {
      throw new Error("Vehicle not found");
    }

    return vehicle;
  }
}
