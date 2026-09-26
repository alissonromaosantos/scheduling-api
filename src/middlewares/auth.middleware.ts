import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";

import { db } from "../database";
import { usersTable } from "../database/schema";
import { env } from "../config/env";
import { AppError } from "../shared/errors/app-error";

export const authMiddleware = async (
  request: Request,
  _: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authorization = request.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new AppError(
        "Token de acesso ausente ou inválido.",
        401,
        "UNAUTHORIZED",
      );
    }

    const token = authorization.replace("Bearer ", "");
    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (
      typeof decoded !== "object" ||
      decoded === null ||
      typeof decoded.sub !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        decoded.sub,
      )
    ) {
      throw new AppError("Token inválido.", 401, "INVALID_TOKEN");
    }

    const [user] = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        role: usersTable.role,
      })
      .from(usersTable)
      .where(eq(usersTable.id, decoded.sub))
      .limit(1);

    if (!user) {
      throw new AppError("Token inválido.", 401, "INVALID_TOKEN");
    }

    request.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      next(new AppError("Token expirado.", 401, "TOKEN_EXPIRED"));
      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError("Token inválido.", 401, "INVALID_TOKEN"));
      return;
    }

    next(error);
  }
};
