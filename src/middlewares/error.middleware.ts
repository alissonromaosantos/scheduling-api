import type {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";

import { ZodError } from "zod";

import { AppError } from "../shared/errors/app-error";

export const errorMiddleware: ErrorRequestHandler = (
  error,
  request: Request,
  response: Response,
  _next: NextFunction,
) => {
  console.error({
    method: request.method,
    url: request.originalUrl,
    error,
  });

  if (error instanceof ZodError) {
    return response.status(400).json({
      status: 400,
      errors: error.issues.map((issue) => issue.message),
    });
  }

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: error.statusCode,
      code: error.code,
      message: error.message,
    });
  }

  if (error instanceof SyntaxError && "body" in error) {
    return response.status(400).json({
      status: 400,
      code: "INVALID_JSON",
      message: "JSON inválido.",
    });
  }

  return response.status(500).json({
    status: 500,
    code: "INTERNAL_SERVER_ERROR",
    message: "Erro interno do servidor.",
  });
};
