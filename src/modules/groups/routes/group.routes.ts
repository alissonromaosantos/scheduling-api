import { Router } from "express";
import {
  createOneGroupController,
  deleteOneGroupController,
  getAllGroupsController,
  getGroupByIdController,
  searchGroupByNameController,
  updateOneGroupController,
} from "../factories/groups.controllers.factories";
import { idSchema } from "../../../utils/schemas/id.schema";
import { validate } from "../../../middlewares/validate.middleware";
import { searchByNameSchema } from "../../../utils/schemas/search-by-name.schema";
import { createGroupSchema } from "../schemas/create-group.schema";
import { updateGroupSchema } from "../schemas/update-group.schema";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { requireRole } from "../../../middlewares/require-role.middleware";
import { adminGroupsController } from "../factories/admin-groups.factory";
import { adminCreateGroupSchema } from "../schemas/create-group.schema";
import { adminOwnerFilterSchema } from "../../../utils/schemas/admin-owner-filter.schema";

export class GroupRoutes {
  init() {
    const router = Router();

    router.use(authMiddleware);

    router.get(
      "/admin/groups",
      requireRole("ADMIN"),
      validate({ query: adminOwnerFilterSchema }),
      adminGroupsController.getAll,
    );
    router.get(
      "/admin/groups/:id",
      requireRole("ADMIN"),
      validate({ params: idSchema }),
      adminGroupsController.getById,
    );
    router.post(
      "/admin/groups",
      requireRole("ADMIN"),
      validate({ body: adminCreateGroupSchema }),
      adminGroupsController.create,
    );
    router.put(
      "/admin/groups/:id",
      requireRole("ADMIN"),
      validate({ params: idSchema, body: updateGroupSchema }),
      adminGroupsController.update,
    );
    router.delete(
      "/admin/groups/:id",
      requireRole("ADMIN"),
      validate({ params: idSchema }),
      adminGroupsController.delete,
    );

    router.get("/groups", getAllGroupsController.getAll);
    router.get(
      "/group/:id",
      validate({ params: idSchema }),
      getGroupByIdController.getById,
    );
    router.get(
      "/groups/search",
      validate({ query: searchByNameSchema }),
      searchGroupByNameController.searchByName,
    );
    router.post(
      "/group",
      validate({ body: createGroupSchema.optional() }),
      createOneGroupController.createOne,
    );
    router.put(
      "/group/:id",
      validate({ params: idSchema, body: updateGroupSchema }),
      updateOneGroupController.updateOne,
    );
    router.delete(
      "/group/:id",
      validate({ params: idSchema }),
      deleteOneGroupController.deleteOne,
    );

    return router;
  }
}
