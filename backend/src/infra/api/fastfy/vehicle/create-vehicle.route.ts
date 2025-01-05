import { FastifyRequest, FastifyReply } from "fastify";
import { HttpMethod, Route } from "../route";
import { CreateVehicleUseCase } from "../../../../core/use-cases/vehicles/create-vehicle.use-case";
import { Vehicle } from "../../../../core/entities/vehicle.entity";
import { CustomException } from "../../../../core/exceptions/interface/exception.interface";

export class CreateVehicleRoute extends Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createVehicleUseCase: CreateVehicleUseCase
  ) {
    super();
  }

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
