import Fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { Route } from "./fastfy/route";
import cors from "@fastify/cors"; // Importar o plugin de CORS

export class ApiFastify {
  private readonly server: FastifyInstance;

  private constructor(routes: Route[]) {
    this.server = Fastify();
    this.enableCors();
    this.addRoutes(routes);
  }

  public static create(routes: Route[]): ApiFastify {
    return new ApiFastify(routes);
  }

  public start(): void {
    this.server.listen({ port: 3000 }, (err, address) => {
      if (!err) {
        console.log(`Server listening at ${address}`);
        return;
      }
      console.error("Error starting the server:", err);
    });
  }

  private addRoutes(routes: Route[]): void {
    routes.forEach((route) => {
      const routeOptions = {
        method: route.getMethod(),
        url: route.getPath(),
        handler: (request: FastifyRequest, reply: FastifyReply) => {
          return route.getHandler()(request, reply);
        },
      };

      this.server.route(routeOptions);
    });
  }

  private enableCors(): void {
    this.server.register(cors, {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    });
  }
}
