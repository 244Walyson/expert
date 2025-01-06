import Fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { Route } from "./fastfy/route";
import FastifyMultipart from "@fastify/multipart";
import cors from "@fastify/cors";
import logger from "../utils/logger";

export class ApiFastify {
  private readonly server: FastifyInstance;

  private constructor(routes: Route[]) {
    this.server = Fastify({ logger: true });
    this.enableCors();
    this.registerMultipart();
    this.addRoutes(routes);
  }

  private registerMultipart(): void {
    this.server.register(FastifyMultipart);
  }

  public static create(routes: Route[]): ApiFastify {
    return new ApiFastify(routes);
  }

  public start(): void {
    this.server.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
      if (err) {
        logger.error(err);
        process.exit(1);
      }
      logger.info(`server listening on ${address}`);
    });
  }

  private addRoutes(routes: Route[]): void {
    routes.forEach((route) => {
      logger.info(`Adding route ${route.getPath()} - ${route.getMethod()}`);
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
