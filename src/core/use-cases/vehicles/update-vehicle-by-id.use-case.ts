import { Vehicle } from "../../entities/vehicle.entity";
import { IVehicleRepository } from "../../interfaces/vehiclerepository.interface";

export class UpdateVehicleByIdUseCase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  async execute(id: string, vehicle: Vehicle): Promise<Vehicle> {
    const vehicleExistis = await this.vehicleRepository.findById(+id);

    if (!vehicleExistis) {
      throw new Error("Vehicle not found");
    }

    delete vehicleExistis.id;
    vehicleExistis.name = vehicle.name;
    vehicleExistis.brand = vehicle.brand;

    return vehicle;
  }
}
