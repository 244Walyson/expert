import { FastifyRequest, FastifyReply } from "fastify";
import { HttpMethod, Route } from "../route";
import { DeleteVehicleByIdUseCase } from "../../../../core/use-cases/vehicles/delete-vehicle-by-id.use-case";

export class DeleteVehicleByIdRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly deleteVehicleByIdUseCase: DeleteVehicleByIdUseCase
  ) {}

  public static create(
    deleteVehicleByIdUseCase: DeleteVehicleByIdUseCase
  ): DeleteVehicleByIdRoute {
    return new DeleteVehicleByIdRoute(
      "/vehicles",
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
