import {
  CategoryEnum as PrismaCategoryEnum,
  PrismaClient,
} from "@prisma/client";
import { Vehicle } from "../../core/entities/vehicle.entity";
import { IVehicleRepository } from "../../core/interfaces/vehiclerepository.interface";
import { CategoryEnum } from "../../core/entities/enums/category.enum";

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

  async findAll(): Promise<Vehicle[]> {
    const result = await this.prismaClient.vehicle.findMany({
      select: {
        id: true,
        name: true,
        plate: true,
        category: true,
        brand: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return result.map((vehicle) => ({
      ...vehicle,
      category: vehicle.category as unknown as CategoryEnum,
    }));
  }

  async create(vehicle: Vehicle): Promise<Vehicle> {
    const result = await this.prismaClient.vehicle.create({
      data: {
        name: vehicle.name,
        plate: vehicle.plate,
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
  async update(vehicle: Vehicle): Promise<Vehicle> {
    const result = await this.prismaClient.vehicle.update({
      where: {
        id: vehicle.id,
      },
      data: {
        name: vehicle.name,
        plate: vehicle.plate,
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
