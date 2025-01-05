import { FastifyRequest, FastifyReply } from "fastify";
import { HttpMethod, Route } from "../route";
import { CustomException } from "../../../../core/exceptions/interface/exception.interface";
import { ImageUploadService } from "../../../utils/s3.service";

export class ImageUploadRoute extends Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly imageUpladService: ImageUploadService
  ) {
    super();
  }

  public static create(
    imageUpladService: ImageUploadService
  ): ImageUploadRoute {
    return new ImageUploadRoute("/images", HttpMethod.POST, imageUpladService);
  }

  getHandler(): (
    request: FastifyRequest,
    response: FastifyReply
  ) => Promise<void> {
    return async (request, response) => {
      try {
        console.log("Request", request.headers);

        const uploadedImage = await this.imageUpladService.uploadFile(request);
        return response.status(200).send(uploadedImage);
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
