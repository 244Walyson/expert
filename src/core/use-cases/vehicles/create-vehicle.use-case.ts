import { Vehicle } from "../../entities/vehicle.entity";
import { IVehicleRepository } from "../../interfaces/vehiclerepository.interface";

export class CreateVehicleUseCase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  async execute(vehicle: Vehicle): Promise<Vehicle> {
    const createdVehicle = await this.vehicleRepository.create(vehicle);
    return createdVehicle;
  }
}
