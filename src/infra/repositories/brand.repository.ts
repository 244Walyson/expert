import { PrismaClient } from "@prisma/client";
import { Brand } from "../../core/entities/brand.entity";
import { IBrandRepository } from "../../core/interfaces/brand-repository.interface";

export class BrandRepository implements IBrandRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findByName(name: string): Promise<Brand | null> {
    return await this.prismaClient.brand.findFirst({
      where: {
        name: name,
      },
    });
  }

  async create(brand: Brand): Promise<Brand> {
    return await this.prismaClient.brand.create({
      data: {
        name: brand.name,
      },
    });
  }
}
