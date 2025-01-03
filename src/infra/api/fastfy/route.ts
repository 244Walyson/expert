import { FastifyReply, FastifyRequest } from "fastify";

export type HttpMethod = "get" | "post" | "put" | "delete";

export const HttpMethod = {
  GET: "get" as HttpMethod,
  POST: "post" as HttpMethod,
  PUT: "put" as HttpMethod,
  DELETE: "delete" as HttpMethod,
} as const;

export abstract class Route {
  abstract getHandler(): (
    request: FastifyRequest,
    response: FastifyReply
  ) => Promise<void>;
  abstract getPath(): string;
  abstract getMethod(): HttpMethod;
  getExceptionMessage(
    error: Error,
    path: string
  ): {
    message: string;
    timestamp: string;
    path: string;
  };
  getExceptionMessage(
    error: Error,
    path: string
  ): {
    message: string;
    timestamp: string;
    path: string;
  } {
    const errorResponse = {
      timestamp: new Date().toISOString(),
      path: path,
    };
    if (error instanceof Error) {
      return {
        message: error.message,
        ...errorResponse,
      };
    }
    return {
      message: "Unknown error",
      ...errorResponse,
    };
  }
}
