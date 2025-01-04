import { PrismaClient } from "@prisma/client";
import { Brand } from "../../core/entities/brand.entity";
import { IBrandRepository } from "../../core/interfaces/repositories/brand-repository.interface";

export class BrandRepository implements IBrandRepository {
  constructor(private readonly prismaClient: PrismaClient) {}
  findAll(): Promise<Brand[]> {
    return this.prismaClient.brand.findMany();
  }
  async findById(id: number): Promise<Brand | null> {
    return await this.prismaClient.brand.findUnique({
      where: {
        id: id,
      },
    });
  }

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
