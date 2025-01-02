import { FastifyReply, FastifyRequest } from "fastify";
import { HttpMethod, Route } from "../route";
import { FindBrandByIdUseCase } from "../../../../core/use-cases/brand/find-brand-by-id.use-case";

export class FindBrandByIdRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly findBrandByIdUseCase: FindBrandByIdUseCase
  ) {}

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
