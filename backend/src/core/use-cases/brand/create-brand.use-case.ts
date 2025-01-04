import { Brand } from "../../entities/brand.entity";
import { DuplicatedResourceException } from "../../exceptions/duplicated-resource.exception";
import { InvalidFieldValueException } from "../../exceptions/invalid-field-value.exception";
import { IBrandRepository } from "../../interfaces/repositories/brand-repository.interface";

export class CreateBrandUseCase {
  constructor(private readonly brandRepository: IBrandRepository) {}

  async execute(brand: Brand): Promise<Brand> {
    this.validateBrand(brand);

    const brandExists = await this.brandRepository.findByName(brand.name);
    if (brandExists) {
      throw new DuplicatedResourceException("Brand already exists");
    }

    return this.brandRepository.create(brand);
  }

  private validateBrand(brand: Brand) {
    if (!brand.name || brand.name.trim() === "") {
      throw new InvalidFieldValueException("Brand name is required");
    }
  }
}
