import { Router } from "express";
import {
  removeContactFromGroupController,
  addContactToGroupController,
  createOneContactController,
  deleteOneContactController,
  getAllContactsController,
  getContactsByGroupsController,
  getContactByIdController,
  searchContactByNameController,
  updateOneContactController,
} from "../factories/contacts.controllers.factories";
import { idSchema } from "../../../utils/schemas/id.schema";
import { validate } from "../../../middlewares/validate.middleware";
import { searchByNameSchema } from "../../../utils/schemas/search-by-name.schema";
import { createContactSchema } from "../schemas/create-contact.schema";
import { updateContactSchema } from "../schemas/update-contact.schema";
import { addContactToGroupSchema } from "../schemas/add-contact-to-group.schema";
import { removeContactFromGroupParamsSchema } from "../schemas/remove-contact-from-group.schema";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { requireRole } from "../../../middlewares/require-role.middleware";
import { adminContactsController } from "../factories/admin-contacts.factory";
import { adminCreateContactSchema } from "../schemas/create-contact.schema";
import { adminAddContactToGroupSchema } from "../schemas/add-contact-to-group.schema";
import { adminOwnerFilterSchema } from "../../../utils/schemas/admin-owner-filter.schema";

export class ContactRoutes {
  init() {
    const router = Router();

    router.use(authMiddleware);

    router.get(
      "/admin/contacts/groups",
      requireRole("ADMIN"),
      validate({ query: adminOwnerFilterSchema }),
      adminContactsController.getAllByGroups,
    );
    router.get(
      "/admin/contacts",
      requireRole("ADMIN"),
      validate({ query: adminOwnerFilterSchema }),
      adminContactsController.getAll,
    );
    router.get(
      "/admin/contacts/:id",
      requireRole("ADMIN"),
      validate({ params: idSchema }),
      adminContactsController.getById,
    );
    router.post(
      "/admin/contacts",
      requireRole("ADMIN"),
      validate({ body: adminCreateContactSchema }),
      adminContactsController.create,
    );
    router.post(
      "/admin/contacts/group",
      requireRole("ADMIN"),
      validate({ body: adminAddContactToGroupSchema }),
      adminContactsController.addToGroup,
    );
    router.delete(
      "/admin/contacts/:contact_id/groups/:group_id",
      requireRole("ADMIN"),
      validate({ params: removeContactFromGroupParamsSchema }),
      adminContactsController.removeFromGroup,
    );
    router.put(
      "/admin/contacts/:id",
      requireRole("ADMIN"),
      validate({ params: idSchema, body: updateContactSchema }),
      adminContactsController.update,
    );
    router.delete(
      "/admin/contacts/:id",
      requireRole("ADMIN"),
      validate({ params: idSchema }),
      adminContactsController.delete,
    );

    router.get("/contacts", getAllContactsController.getAll);
    router.get("/contacts/groups", getContactsByGroupsController.getAll);
    router.get(
      "/contact/:id",
      validate({ params: idSchema }),
      getContactByIdController.getById,
    );
    router.get(
      "/contacts/search",
      validate({ query: searchByNameSchema }),
      searchContactByNameController.searchByName,
    );
    router.post(
      "/contact",
      validate({ body: createContactSchema }),
      createOneContactController.createOne,
    );
    router.post(
      "/contacts/group",
      validate({ body: addContactToGroupSchema }),
      addContactToGroupController.add,
    );
    router.delete(
      "/contacts/:contact_id/groups/:group_id",
      validate({ params: removeContactFromGroupParamsSchema }),
      removeContactFromGroupController.remove,
    );
    router.put(
      "/contact/:id",
      validate({ params: idSchema, body: updateContactSchema }),
      updateOneContactController.updateOne,
    );
    router.delete(
      "/contact/:id",
      validate({ params: idSchema }),
      deleteOneContactController.deleteOne,
    );

    return router;
  }
}
