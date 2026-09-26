import { AddContactToGroupController } from "../controllers/add-contact-to-group.controller";
import { CreateOneContactController } from "../controllers/create-one.controller";
import { DeleteOneContactController } from "../controllers/delete-one.controller";
import { GetAllContactsController } from "../controllers/get-all.controller";
import { GetContactsByGroupsController } from "../controllers/get-by-groups.controller";
import { GetContactByIdController } from "../controllers/get-by-id.controller";
import { RemoveContactFromGroupController } from "../controllers/remove-contact-from-group.controller";
import { SearchContactByNameController } from "../controllers/search-by-name.controller";
import { UpdateOneContactController } from "../controllers/update-one.controller";
import {
  createOneContactService,
  deleteOneContactService,
  getAllContactsService,
  getContactsByGroupsService,
  getContactByIdService,
  searchContactByNameService,
  removeContactFromGroupService,
  updateOneContactService,
  addContactToGroupService,
} from "./contacts.services.factories";

export const getAllContactsController = new GetAllContactsController(
  getAllContactsService,
);
export const getContactsByGroupsController = new GetContactsByGroupsController(
  getContactsByGroupsService,
);
export const getContactByIdController = new GetContactByIdController(
  getContactByIdService,
);
export const searchContactByNameController = new SearchContactByNameController(
  searchContactByNameService,
);
export const createOneContactController = new CreateOneContactController(
  createOneContactService,
);
export const addContactToGroupController = new AddContactToGroupController(addContactToGroupService);
export const updateOneContactController = new UpdateOneContactController(
  updateOneContactService,
);
export const deleteOneContactController = new DeleteOneContactController(
  deleteOneContactService,
);

export const removeContactFromGroupController =
  new RemoveContactFromGroupController(removeContactFromGroupService);
