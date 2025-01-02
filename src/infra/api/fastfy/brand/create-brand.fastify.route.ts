import { FastifyReply, FastifyRequest } from "fastify";
import { Brand } from "../../../../core/entities/brand.entity";
import { HttpMethod, Route } from "../route";
import { CreateBrandUseCase } from "../../../../core/use-cases/brand/create-brand.use-case";

export class CreateBrandRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createBrandUseCase: CreateBrandUseCase
  ) {}

  public static create(
    createBrandUseCase: CreateBrandUseCase
  ): CreateBrandRoute {
    return new CreateBrandRoute("/brands", HttpMethod.POST, createBrandUseCase);
  }

  getHandler(): (
    request: FastifyRequest,
    response: FastifyReply
  ) => Promise<void> {
    return async (request, response) => {
      try {
        const brand = request.body as Brand;
        const createdBrand = await this.createBrandUseCase.execute(brand);
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
