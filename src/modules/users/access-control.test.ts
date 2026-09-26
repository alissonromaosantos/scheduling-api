import assert from "node:assert/strict";
import test from "node:test";
import type { Request, Response, NextFunction } from "express";
import { requireRole } from "../../middlewares/require-role.middleware";
import { signupSchema } from "../auth/signup/schemas/signup.schema";
import {
  createUserSchema,
  updateOwnUserSchema,
} from "./schemas/create-user.schema";
import { UsersService } from "./services/users.service";

const validUser = {
  fullname: "Example User",
  email: "example@example.com",
  cpf: "123.456.789-09",
  password: "Password@123",
};

test("public signup never accepts a requested ADMIN role", () => {
  const result = signupSchema.parse({ ...validUser, role: "ADMIN" });
  assert.equal("role" in result, false);
});

test("admin user schema validates role values", () => {
  assert.equal(
    createUserSchema.safeParse({ ...validUser, role: "ADMIN" }).success,
    true,
  );
  assert.equal(
    createUserSchema.safeParse({ ...validUser, role: "ROOT" }).success,
    false,
  );
});

test("own-profile updates cannot change role", () => {
  const result = updateOwnUserSchema.safeParse({ role: "ADMIN" });
  assert.equal(result.success, false);
});

test("role guard denies USER and permits ADMIN", () => {
  const guard = requireRole("ADMIN");
  const errors: unknown[] = [];
  let proceeded = 0;
  const next: NextFunction = ((error?: unknown) => {
    if (error) errors.push(error);
    else proceeded += 1;
  }) as NextFunction;
  const response = {} as Response;

  guard(
    {
      user: { id: "user-id", email: "user@example.com", role: "USER" },
    } as Request,
    response,
    next,
  );
  guard(
    {
      user: { id: "admin-id", email: "admin@example.com", role: "ADMIN" },
    } as Request,
    response,
    next,
  );

  assert.equal(errors.length, 1);
  assert.equal(proceeded, 1);
});

test("service refuses deletion of the last administrator", async () => {
  const repository = {
    deleteById: async () => "last-admin" as const,
  };
  const service = new UsersService(repository as never);

  await assert.rejects(
    service.delete("admin-id"),
    (error: unknown) =>
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "LAST_ADMIN",
  );
});

test("service refuses demotion of the last administrator", async () => {
  const repository = {
    updateByAdmin: async () => ({ kind: "last-admin" as const }),
  };
  const service = new UsersService(repository as never);

  await assert.rejects(
    service.updateByAdmin("admin-id", { role: "USER" }),
    (error: unknown) =>
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "LAST_ADMIN",
  );
});
