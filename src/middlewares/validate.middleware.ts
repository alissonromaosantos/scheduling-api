import type { NextFunction, Request, Response } from "express";

import type { ZodType } from "zod";

type ValidationSchema = {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
};

export const validate = (schemas: ValidationSchema) => {
  return (request: Request, response: Response, next: NextFunction): void => {
    try {
      const validated: Record<string, unknown> = {};

      if (schemas.body) {
        validated.body = schemas.body.parse(request.body);
      }

      if (schemas.params) {
        validated.params = schemas.params.parse(request.params);
      }

      if (schemas.query) {
        validated.query = schemas.query.parse(request.query);
      }

      response.locals.validated = validated;

      next();
    } catch (error) {
      next(error);
    }
  };
};
