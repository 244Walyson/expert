import { FastifyRequest, FastifyReply } from "fastify";
import { HttpMethod, Route } from "../route";
import { DeleteVehicleByIdUseCase } from "../../../../core/use-cases/vehicles/delete-vehicle-by-id.use-case";
import { CustomException } from "../../../../core/exceptions/interface/exception.interface";

export class DeleteVehicleByIdRoute extends Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly deleteVehicleByIdUseCase: DeleteVehicleByIdUseCase
  ) {
    super();
  }

  public static create(
    deleteVehicleByIdUseCase: DeleteVehicleByIdUseCase
  ): DeleteVehicleByIdRoute {
    return new DeleteVehicleByIdRoute(
      "/vehicles/:id",
      HttpMethod.DELETE,
      deleteVehicleByIdUseCase
    );
  }

  getHandler(): (
    request: FastifyRequest,
    response: FastifyReply
  ) => Promise<void> {
    return async (request, response) => {
      try {
        const { id } = request.params as { id: string };
        const createdBrand = await this.deleteVehicleByIdUseCase.execute(id);
        return response.status(204).send(createdBrand);
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
