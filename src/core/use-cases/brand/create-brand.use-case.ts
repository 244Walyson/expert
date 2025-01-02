import { Brand } from "../../entities/brand.entity";
import { IBrandRepository } from "../../interfaces/brand-repository.interface";

export class CreateBrandUseCase {
  constructor(private readonly brandRepository: IBrandRepository) {}

  async execute(brand: Brand): Promise<Brand> {
    if (!brand.name) {
      throw new Error("Brand name is required");
    }
    const brandExists = await this.brandRepository.findByName(brand.name);

    if (brandExists) {
      throw new Error("Brand already exists");
    }

    return this.brandRepository.create(brand);
  }
}
