import { ResourceNotFoundException } from "../../exceptions/resource-not-found.exception";
import { IVehicleRepository } from "../../interfaces/repositories/vehiclerepository.interface";

export class DeleteVehicleByIdUseCase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  async execute(id: string): Promise<void> {
    const vehicle = await this.vehicleRepository.findById(+id);

    if (!vehicle) {
      throw new ResourceNotFoundException("Vehicle not found");
    }

    await this.vehicleRepository.delete(+id);
  }
}
