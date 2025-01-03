import { Brand } from "../../entities/brand.entity";
import { ResourceNotFoundException } from "../../exceptions/resource-not-found.exception";
import { IBrandRepository } from "../../interfaces/repositories/brand-repository.interface";

export class FindBrandByIdUseCase {
  constructor(private readonly brandRepository: IBrandRepository) {}

  async execute(id: string): Promise<Brand> {
    const brand = await this.brandRepository.findById(+id);

    if (!brand) {
      throw new ResourceNotFoundException("Brand not found");
    }
    return brand;
  }
}
