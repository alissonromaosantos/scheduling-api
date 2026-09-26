import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../database/schema";
import { AppError } from "../shared/errors/app-error";

export const requireRole = (...allowedRoles: UserRole[]) => {
  return (request: Request, _response: Response, next: NextFunction): void => {
    if (!request.user) {
      next(new AppError("Autenticação necessária.", 401, "UNAUTHORIZED"));
      return;
    }

    if (!allowedRoles.includes(request.user.role)) {
      next(new AppError("Acesso negado.", 403, "FORBIDDEN"));
      return;
    }

    next();
  };
};
