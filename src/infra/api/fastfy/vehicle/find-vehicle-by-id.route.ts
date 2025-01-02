import { FastifyRequest, FastifyReply } from "fastify";
import { HttpMethod, Route } from "../route";
import { FindVehicleByIdUseCase } from "../../../../core/use-cases/vehicles/find-vehicle-by-id.use-case";

export class FindVehicleByIdRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly findVehicleByIdUseCase: FindVehicleByIdUseCase
  ) {}

  public static create(
    findVehicleByIdUseCase: FindVehicleByIdUseCase
  ): FindVehicleByIdRoute {
    return new FindVehicleByIdRoute(
      "/vehicles",
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
        const { id } = request.body as { id: string };
        const createdBrand = await this.findVehicleByIdUseCase.execute(id);
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
