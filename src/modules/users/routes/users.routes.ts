import { Router } from "express";
import { validate } from "../../../middlewares/validate.middleware";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { requireRole } from "../../../middlewares/require-role.middleware";
import { idSchema } from "../../../utils/schemas/id.schema";
import { usersController } from "../factories/users.factories";
import { createUserSchema } from "../schemas/create-user.schema";
import {
  updateAdminUserSchema,
  updateOwnUserSchema,
} from "../schemas/create-user.schema";

export class UsersRoutes {
  init() {
    const router = Router();
    router.use(authMiddleware);

    router.get("/users/me", usersController.getOwn);
    router.put(
      "/users/me",
      validate({ body: updateOwnUserSchema }),
      usersController.updateOwn,
    );
    router.delete("/users/me", usersController.deleteOwn);

    router.get("/admin/users", requireRole("ADMIN"), usersController.getAll);
    router.get(
      "/admin/users/:id",
      requireRole("ADMIN"),
      validate({ params: idSchema }),
      usersController.getById,
    );
    router.post(
      "/admin/users",
      requireRole("ADMIN"),
      validate({ body: createUserSchema }),
      usersController.create,
    );
    router.put(
      "/admin/users/:id",
      requireRole("ADMIN"),
      validate({ params: idSchema, body: updateAdminUserSchema }),
      usersController.updateByAdmin,
    );
    router.delete(
      "/admin/users/:id",
      requireRole("ADMIN"),
      validate({ params: idSchema }),
      usersController.deleteByAdmin,
    );

    return router;
  }
}
