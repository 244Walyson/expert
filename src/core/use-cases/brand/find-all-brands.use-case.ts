import { Brand } from "../../entities/brand.entity";
import { IBrandRepository } from "../../interfaces/repositories/brand-repository.interface";

export class FindAllBrandsUseCase {
  constructor(private readonly brandRepository: IBrandRepository) {}

  async execute(): Promise<Brand[]> {
    const brands = await this.brandRepository.findAll();
    return brands;
  }
}
