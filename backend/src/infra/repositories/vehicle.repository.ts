import {
  Prisma,
  CategoryEnum as PrismaCategoryEnum,
  PrismaClient,
} from "@prisma/client";
import { Vehicle } from "../../core/entities/vehicle.entity";
import { CategoryEnum } from "../../core/entities/enums/category.enum";
import { PaginatedResponse } from "../../core/interfaces/shared/paginated-response.interface";
import { IVehicleRepository } from "../../core/interfaces/repositories/vehiclerepository.interface";

export class VehicleRepository implements IVehicleRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findById(id: number): Promise<Vehicle | null> {
    const result = await this.prismaClient.vehicle.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        plate: true,
        imgUrl: true,
        category: true,
        brand: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!result) {
      return null;
    }
    return {
      ...result,
      category: result.category as unknown as CategoryEnum,
    };
  }

  async findAll({
    query,
    category,
    offset,
    limit,
  }: {
    query: string;
    category?: CategoryEnum;
    offset: number;
    limit: number;
  }): Promise<PaginatedResponse<Vehicle>> {
    const whereClause: Prisma.vehicleWhereInput = {
      ...(query && {
        OR: [
          { name: { contains: query } },
          { plate: { contains: query } },
          { brand: { name: { contains: query } } },
        ],
      }),
      ...(category && { category: category as unknown as PrismaCategoryEnum }),
    };

    const total = await this.prismaClient.vehicle.count({
      where: whereClause,
    });

    const result = await this.prismaClient.vehicle.findMany({
      where: whereClause,
      skip: offset,
      take: limit,
      select: {
        id: true,
        name: true,
        plate: true,
        imgUrl: true,
        category: true,
        brand: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return {
      data: result.map((vehicle) => ({
        ...vehicle,
        category: vehicle.category as unknown as CategoryEnum,
      })),
      pages: Math.ceil(total / limit),
      total: total,
    };
  }

  async findByPlate(plate: string): Promise<Vehicle | null> {
    const result = await this.prismaClient.vehicle.findFirst({
      where: {
        plate: plate,
      },
      select: {
        id: true,
        name: true,
        plate: true,
        imgUrl: true,
        category: true,
        brand: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!result) {
      return null;
    }
    return {
      ...result,
      category: result.category as unknown as CategoryEnum,
    };
  }

  async create(vehicle: Vehicle): Promise<Vehicle> {
    const result = await this.prismaClient.vehicle.create({
      data: {
        name: vehicle.name,
        plate: vehicle.plate,
        imgUrl: vehicle.imgUrl,
        category: vehicle.category as unknown as PrismaCategoryEnum,
        brand: {
          connect: {
            id: vehicle.brand?.id,
          },
        },
      },
      select: {
        id: true,
        name: true,
        plate: true,
        imgUrl: true,
        category: true,
        brand: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return {
      ...result,
      category: result.category as unknown as CategoryEnum,
    };
  }
  async update(id: number, vehicle: Vehicle): Promise<Vehicle> {
    const result = await this.prismaClient.vehicle.update({
      where: {
        id: id,
      },
      data: {
        name: vehicle.name,
        plate: vehicle.plate,
        imgUrl: vehicle.imgUrl,
        brand: {
          connect: {
            id: vehicle.brand?.id,
          },
        },
      },
      select: {
        id: true,
        name: true,
        plate: true,
        imgUrl: true,
        category: true,
        brand: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return {
      ...result,
      category: result.category as unknown as CategoryEnum,
    };
  }
  async delete(id: number): Promise<void> {
    await this.prismaClient.vehicle.delete({
      where: {
        id: id,
      },
    });
  }
}
