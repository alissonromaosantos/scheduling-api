import { randomUUID } from "node:crypto";
import type { NextFunction, RequestHandler, Request, Response } from "express";

export const requestIdMiddleware: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
  const id = request.header("X-ID") ?? randomUUID();

  request.id = id;
  response.setHeader("X-ID", id);

  next();
};
