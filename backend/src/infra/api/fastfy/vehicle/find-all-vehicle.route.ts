import { FastifyRequest, FastifyReply } from "fastify";
import { HttpMethod, Route } from "../route";
import { FindAllVehiclesUseCase } from "../../../../core/use-cases/vehicles/find-all-vehicles.use-case";
import { CustomException } from "../../../../core/exceptions/interface/exception.interface";
import { CategoryEnum } from "../../../../core/entities/enums/category.enum";

export class FindAllVehicleRoute extends Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly findAllVehicleUseCase: FindAllVehiclesUseCase
  ) {
    super();
  }

  public static create(
    findAllVehicleUseCase: FindAllVehiclesUseCase
  ): FindAllVehicleRoute {
    return new FindAllVehicleRoute(
      "/vehicles",
      HttpMethod.GET,
      findAllVehicleUseCase
    );
  }

  getHandler(): (
    request: FastifyRequest,
    response: FastifyReply
  ) => Promise<void> {
    return async (request, response) => {
      try {
        const {
          query = "",
          category,
          page = 1,
          limit = 10,
        } = request.query as {
          query: string;
          category: CategoryEnum;
          page: number;
          limit: number;
        };
        const createdBrand = await this.findAllVehicleUseCase.execute({
          query,
          category,
          page,
          limit,
        });
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
