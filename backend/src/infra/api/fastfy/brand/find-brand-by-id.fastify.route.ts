import { FastifyReply, FastifyRequest } from "fastify";
import { HttpMethod, Route } from "../route";
import { FindBrandByIdUseCase } from "../../../../core/use-cases/brand/find-brand-by-id.use-case";
import { CustomException } from "../../../../core/exceptions/interface/exception.interface";

export class FindBrandByIdRoute extends Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly findBrandByIdUseCase: FindBrandByIdUseCase
  ) {
    super();
  }

  public static create(
    findBrandByIdUseCase: FindBrandByIdUseCase
  ): FindBrandByIdRoute {
    return new FindBrandByIdRoute(
      "/brands/:id",
      HttpMethod.GET,
      findBrandByIdUseCase
    );
  }

  getHandler(): (
    request: FastifyRequest,
    response: FastifyReply
  ) => Promise<void> {
    return async (request, response) => {
      try {
        const { id } = request.params as { id: string };
        const createdBrand = await this.findBrandByIdUseCase.execute(id);
        return response.status(200).send(createdBrand);
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
