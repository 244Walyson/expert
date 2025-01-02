import { PrismaClient } from "@prisma/client";
import { CreateBrandUseCase } from "./core/use-cases/brand/create-brand.use-case";
import { ApiFastify } from "./infra/api/api.fastify";
import { CreateBrandRoute } from "./infra/api/fastfy/brand/create-brand.fastify.route";
import { BrandRepository } from "./infra/repositories/brand.repository";
import { CreateVehicleUseCase } from "./core/use-cases/vehicles/create-vehicle.use-case";
import { VehicleRepository } from "./infra/repositories/vehicle.repository";
import { DeleteVehicleByIdUseCase } from "./core/use-cases/vehicles/delete-vehicle-by-id.use-case";
import { FindVehicleByIdUseCase } from "./core/use-cases/vehicles/find-vehicle-by-id.use-case";
import { UpdateVehicleByIdUseCase } from "./core/use-cases/vehicles/update-vehicle-by-id.use-case";
import { CreateVehicleRoute } from "./infra/api/fastfy/vehicle/create-vehicle.route";
import { DeleteVehicleByIdRoute } from "./infra/api/fastfy/vehicle/delete-vehicle-by-id.route";
import { FindVehicleByIdRoute } from "./infra/api/fastfy/vehicle/find-vehicle-by-id.route";
import { UpdateVehicleByIdRoute } from "./infra/api/fastfy/vehicle/update-vehicle-by-id.route";

const prismaClient = new PrismaClient();

const brandRepository = new BrandRepository(prismaClient);
const createBrandUseCase = new CreateBrandUseCase(brandRepository);
const createBrandFastifyRoute = CreateBrandRoute.create(createBrandUseCase);

const vehicleRepository = new VehicleRepository(prismaClient);
const createVehicleUseCase = new CreateVehicleUseCase(vehicleRepository);
const updateVehicleByIdUseCase = new UpdateVehicleByIdUseCase(
  vehicleRepository
);
const findVehicleByIdUseCase = new FindVehicleByIdUseCase(vehicleRepository);
const deleteVehicleByIdUseCase = new DeleteVehicleByIdUseCase(
  vehicleRepository
);

const createVehicleFastifyRoute =
  CreateVehicleRoute.create(createVehicleUseCase);
const updateVehicleByIdFastifyRoute = UpdateVehicleByIdRoute.create(
  updateVehicleByIdUseCase
);
const findVehicleByIdFastifyRoute = FindVehicleByIdRoute.create(
  findVehicleByIdUseCase
);
const deleteVehicleByIdFastifyRoute = DeleteVehicleByIdRoute.create(
  deleteVehicleByIdUseCase
);

const routes = [
  createBrandFastifyRoute,
  createVehicleFastifyRoute,
  updateVehicleByIdFastifyRoute,
  findVehicleByIdFastifyRoute,
  deleteVehicleByIdFastifyRoute,
];

ApiFastify.create(routes).start();
