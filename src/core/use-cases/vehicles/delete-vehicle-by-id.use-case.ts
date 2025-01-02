import { IVehicleRepository } from "../../interfaces/vehiclerepository.interface";

export class DeleteVehicleByIdUseCase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  async execute(id: string): Promise<void> {
    const vehicle = await this.vehicleRepository.findById(+id);

    if (!vehicle) {
      throw new Error("Vehicle not found");
    }

    await this.vehicleRepository.delete(+id);
  }
}
