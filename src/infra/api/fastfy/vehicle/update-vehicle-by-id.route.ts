import { FastifyRequest, FastifyReply } from "fastify";
import { HttpMethod, Route } from "../route";
import { UpdateVehicleByIdUseCase } from "../../../../core/use-cases/vehicles/update-vehicle-by-id.use-case";
import { Vehicle } from "../../../../core/entities/vehicle.entity";
import { CustomException } from "../../../../core/exceptions/interface/exception.interface";

export class UpdateVehicleByIdRoute extends Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly updateVehicleByIdUseCase: UpdateVehicleByIdUseCase
  ) {
    super();
  }

  public static create(
    updateVehicleByIdUseCase: UpdateVehicleByIdUseCase
  ): UpdateVehicleByIdRoute {
    return new UpdateVehicleByIdRoute(
      "/vehicles/:id",
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
        const errorResponse = this.getExceptionMessage(
          error as Error,
          this.path
        );
        if (error instanceof CustomException) {
          return response.status(error.code).send(errorResponse);
        }
        return response.status(400).send(errorResponse);
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
