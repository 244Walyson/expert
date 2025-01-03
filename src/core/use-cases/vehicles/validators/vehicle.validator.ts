import { Vehicle } from "../../../entities/vehicle.entity";
import { InvalidFieldValueException } from "../../../exceptions/invalid-field-value.exception";
import { FindBrandByIdUseCase } from "../../brand/find-brand-by-id.use-case";

export class VehicleValidator {
  constructor(private readonly findBrandByIdUseCase: FindBrandByIdUseCase) {}

  validateVehicle(vehicle: Vehicle) {
    if (!vehicle.brand.id) {
      throw new InvalidFieldValueException("Vehicle brand is required");
    }
    if (!vehicle.name || vehicle.name.trim() === "") {
      throw new InvalidFieldValueException("Vehicle model is required");
    }
    if (!vehicle.plate || vehicle.plate.trim() === "") {
      throw new InvalidFieldValueException("Vehicle plate is required");
    }
    const plateRegex = /^[A-Z]{3}\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/;
    if (!plateRegex.exec(vehicle.plate)) {
      throw new InvalidFieldValueException("Invalid vehicle plate");
    }
    if (!vehicle.category) {
      throw new InvalidFieldValueException("Vehicle category is required");
    }
  }

  async validateBrandExists(brandId: string) {
    await this.findBrandByIdUseCase.execute(brandId);
  }
}
