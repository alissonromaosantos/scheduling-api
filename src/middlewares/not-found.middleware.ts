import type { NextFunction, RequestHandler, Request, Response } from "express";

export const notFoundMiddleware: RequestHandler = (request: Request, _response: Response, next: NextFunction) => {
  const error = new Error(
    `Rota ${request.method} ${request.originalUrl} não encontrada.`,
  );

  Object.assign(error, {
    statusCode: 404,
    code: "ROUTE_NOT_FOUND",
  });

  next(error);
};
