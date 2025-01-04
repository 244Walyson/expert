import { FastifyRequest, FastifyReply } from "fastify";
import { HttpMethod, Route } from "../route";
import { FindVehicleByIdUseCase } from "../../../../core/use-cases/vehicles/find-vehicle-by-id.use-case";
import { CustomException } from "../../../../core/exceptions/interface/exception.interface";

export class FindVehicleByIdRoute extends Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly findVehicleByIdUseCase: FindVehicleByIdUseCase
  ) {
    super();
  }

  public static create(
    findVehicleByIdUseCase: FindVehicleByIdUseCase
  ): FindVehicleByIdRoute {
    return new FindVehicleByIdRoute(
      "/vehicles/:id",
      HttpMethod.GET,
      findVehicleByIdUseCase
    );
  }

  getHandler(): (
    request: FastifyRequest,
    response: FastifyReply
  ) => Promise<void> {
    return async (request, response) => {
      try {
        const { id } = request.params as { id: string };
        const createdBrand = await this.findVehicleByIdUseCase.execute(id);
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
