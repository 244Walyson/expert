import { FastifyReply, FastifyRequest } from "fastify";
import { HttpMethod, Route } from "../route";
import { FindAllBrandsUseCase } from "../../../../core/use-cases/brand/find-all-brands.use-case";
import { CustomException } from "../../../../core/exceptions/interface/exception.interface";

export class FindAllBrandsRoute extends Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly findAllBrandsUseCase: FindAllBrandsUseCase
  ) {
    super();
  }

  public static create(
    findAllBrandsUseCase: FindAllBrandsUseCase
  ): FindAllBrandsRoute {
    return new FindAllBrandsRoute(
      "/brands",
      HttpMethod.GET,
      findAllBrandsUseCase
    );
  }

  getHandler(): (
    request: FastifyRequest,
    response: FastifyReply
  ) => Promise<void> {
    return async (request, response) => {
      try {
        const createdBrand = await this.findAllBrandsUseCase.execute();
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
