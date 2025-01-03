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
import { FindBrandByIdUseCase } from "./core/use-cases/brand/find-brand-by-id.use-case";
import { FindBrandByIdRoute } from "./infra/api/fastfy/brand/find-brand-by-id.fastify.route";
import { FindAllVehiclesUseCase } from "./core/use-cases/vehicles/find-all-vehicles.use-case";
import { FindAllVehicleRoute } from "./infra/api/fastfy/vehicle/find-all-vehicle.route";
import { VehicleValidator } from "./core/use-cases/vehicles/validators/vehicle.validator";
import { FindAllBrandsUseCase } from "./core/use-cases/brand/find-all-brands.use-case";
import { FindAllBrandsRoute } from "./infra/api/fastfy/brand/find-alll-brands.fastify.route";

const prismaClient = new PrismaClient();

const brandRepository = new BrandRepository(prismaClient);
const createBrandUseCase = new CreateBrandUseCase(brandRepository);
const findBrandByIdUseCase = new FindBrandByIdUseCase(brandRepository);
const findAllBrandsUseCase = new FindAllBrandsUseCase(brandRepository);
const createBrandFastifyRoute = CreateBrandRoute.create(createBrandUseCase);
const findBrandByIdRoute = FindBrandByIdRoute.create(findBrandByIdUseCase);
const findAllBrandsRoute = FindAllBrandsRoute.create(findAllBrandsUseCase);

const vehicleValidator = new VehicleValidator(findBrandByIdUseCase);
const vehicleRepository = new VehicleRepository(prismaClient);
const createVehicleUseCase = new CreateVehicleUseCase(
  vehicleRepository,
  vehicleValidator
);
const updateVehicleByIdUseCase = new UpdateVehicleByIdUseCase(
  vehicleRepository,
  vehicleValidator
);
const findVehicleByIdUseCase = new FindVehicleByIdUseCase(vehicleRepository);
const deleteVehicleByIdUseCase = new DeleteVehicleByIdUseCase(
  vehicleRepository
);
const findAllVehicleUseCase = new FindAllVehiclesUseCase(vehicleRepository);

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
const findAllVehicleFastifyRoute = FindAllVehicleRoute.create(
  findAllVehicleUseCase
);

const routes = [
  createBrandFastifyRoute,
  findBrandByIdRoute,
  createVehicleFastifyRoute,
  updateVehicleByIdFastifyRoute,
  findVehicleByIdFastifyRoute,
  deleteVehicleByIdFastifyRoute,
  findAllVehicleFastifyRoute,
  findAllBrandsRoute
];

ApiFastify.create(routes).start();
