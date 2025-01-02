import { PrismaClient } from "@prisma/client";
import { Vehicle } from "../../core/entities/vehicle.entity";
import { IVehicleRepository } from "../../core/interfaces/vehiclerepository.interface";

export class VehicleRepository implements IVehicleRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findById(id: number): Promise<Vehicle | null> {
    return await this.prismaClient.vehicle.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        plate: true,
        brand: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
  async create(vehicle: Vehicle): Promise<Vehicle> {
    return await this.prismaClient.vehicle.create({
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
        brand: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
  async update(vehicle: Vehicle): Promise<Vehicle> {
    return await this.prismaClient.vehicle.update({
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
        brand: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
  async delete(id: number): Promise<void> {
    await this.prismaClient.vehicle.delete({
      where: {
        id: id,
      },
    });
  }
}
