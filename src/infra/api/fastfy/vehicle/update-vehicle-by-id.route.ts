import { FastifyRequest, FastifyReply } from "fastify";
import { HttpMethod, Route } from "../route";
import { UpdateVehicleByIdUseCase } from "../../../../core/use-cases/vehicles/update-vehicle-by-id.use-case";
import { Vehicle } from "../../../../core/entities/vehicle.entity";

export class UpdateVehicleByIdRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly updateVehicleByIdUseCase: UpdateVehicleByIdUseCase
  ) {}

  public static create(
    updateVehicleByIdUseCase: UpdateVehicleByIdUseCase
  ): UpdateVehicleByIdRoute {
    return new UpdateVehicleByIdRoute(
      "/vehicles",
      HttpMethod.PUT,
      updateVehicleByIdUseCase
    );
  }

  getHandler(): (
    request: FastifyRequest,
    response: FastifyReply
  ) => Promise<void> {
    return async (request, response) => {
      try {
        const { id } = request.params as { id: string };
        const vehicle = request.body as Vehicle;
        const createdBrand = await this.updateVehicleByIdUseCase.execute(
          id,
          vehicle
        );
        console.log("Brand created", createdBrand);
        return response.status(201).send(createdBrand);
      } catch (error) {
        console.error("Error creating brand", error);
        return response.status(400).send({ message: "Error Creating Brand" });
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
