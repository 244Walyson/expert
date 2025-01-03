import { Vehicle } from "../../entities/vehicle.entity";
import { DuplicatedResourceException } from "../../exceptions/duplicated-resource.exception";
import { ResourceNotFoundException } from "../../exceptions/resource-not-found.exception";
import { IVehicleRepository } from "../../interfaces/repositories/vehiclerepository.interface";
import { VehicleValidator } from "./validators/vehicle.validator";

export class UpdateVehicleByIdUseCase {
  constructor(
    private readonly vehicleRepository: IVehicleRepository,
    private readonly vehicleValidator: VehicleValidator
  ) {}

  async execute(id: string, vehicle: Vehicle): Promise<Vehicle> {
    delete vehicle.id;
    this.vehicleValidator.validateVehicle(vehicle);
    const vehicleExists = await this.vehicleRepository.findById(+id);
    if (!vehicleExists) {
      throw new ResourceNotFoundException("Vehicle not found");
    }
    if (vehicle.plate !== vehicleExists.plate) {
      const vehicleExistis = await this.vehicleRepository.findByPlate(
        vehicle.plate
      );
      if (vehicleExistis) {
        throw new DuplicatedResourceException(
          "Vehicle with this plate already exists"
        );
      }
    }
    const updatedVehicle = await this.vehicleRepository.update(+id, vehicle);

    return updatedVehicle;
  }
}
