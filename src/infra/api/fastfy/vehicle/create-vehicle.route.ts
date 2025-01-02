import { FastifyRequest, FastifyReply } from "fastify";
import { HttpMethod, Route } from "../route";
import { CreateVehicleUseCase } from "../../../../core/use-cases/vehicles/create-vehicle.use-case";
import { Vehicle } from "../../../../core/entities/vehicle.entity";

export class CreateVehicleRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createVehicleUseCase: CreateVehicleUseCase
  ) {}

  public static create(
    createVehicleUseCase: CreateVehicleUseCase
  ): CreateVehicleRoute {
    return new CreateVehicleRoute(
      "/vehicles",
      HttpMethod.POST,
      createVehicleUseCase
    );
  }

  getHandler(): (
    request: FastifyRequest,
    response: FastifyReply
  ) => Promise<void> {
    return async (request, response) => {
      try {
        const brand = request.body as Vehicle;
        const createdBrand = await this.createVehicleUseCase.execute(brand);
        console.log("Vehicle created", createdBrand);
        return response.status(201).send(createdBrand);
      } catch (error) {
        console.error("Error creating Vehicle", error);
        return response.status(400).send({ message: "Error Creating Vehicle" });
      }
    };
  }
  getPath(): string {
    return this.path;
  }
  getMethod(): HttpMethod {
    return this.method;
  }
}
