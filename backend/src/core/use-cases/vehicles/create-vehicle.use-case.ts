import { Vehicle } from "../../entities/vehicle.entity";
import { DuplicatedResourceException } from "../../exceptions/duplicated-resource.exception";
import { IVehicleRepository } from "../../interfaces/repositories/vehiclerepository.interface";
import { VehicleValidator } from "./validators/vehicle.validator";

export class CreateVehicleUseCase {
  constructor(
    private readonly vehicleRepository: IVehicleRepository,
    private readonly vehicleValidator: VehicleValidator
  ) {}

  async execute(vehicle: Vehicle): Promise<Vehicle> {
    this.vehicleValidator.validateVehicle(vehicle);
    const vehicleExistis = await this.vehicleRepository.findByPlate(
      vehicle.plate
    );
    if (vehicleExistis) {
      throw new DuplicatedResourceException(
        "Vehicle with this plate already exists"
      );
    }
    this.vehicleValidator.validateBrandExists(vehicle.brand.id?.toString()!);
    const createdVehicle = await this.vehicleRepository.create(vehicle);
    return createdVehicle;
  }
}
