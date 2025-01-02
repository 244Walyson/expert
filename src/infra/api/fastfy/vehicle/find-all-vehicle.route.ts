import { FastifyRequest, FastifyReply } from "fastify";
import { HttpMethod, Route } from "../route";
import { FindAllVehiclesUseCase } from "../../../../core/use-cases/vehicles/find-all-vehicles.use-case";

export class FindAllVehicleRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly findAllVehicleUseCase: FindAllVehiclesUseCase
  ) {}

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
        const createdBrand = await this.findAllVehicleUseCase.execute();
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
