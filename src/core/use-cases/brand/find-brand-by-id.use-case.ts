import { Brand } from "../../entities/brand.entity";
import { IBrandRepository } from "../../interfaces/brand-repository.interface";

export class FindBrandByIdUseCase {
  constructor(private readonly brandRepository: IBrandRepository) {}

  async execute(id: string): Promise<Brand> {
    const brand = await this.brandRepository.findById(+id);

    if (!brand) {
      throw new Error("Brand not found");
    }
    return brand;
  }
}
