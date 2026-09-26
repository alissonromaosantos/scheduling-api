import { AdminContactsController } from "../controllers/admin.controller";
import { UsersRepository } from "../../users/repositories/users.repository";
import {
  addContactToGroupService,
  createOneContactService,
  deleteOneContactService,
  getAllContactsService,
  getContactsByGroupsService,
  getContactByIdService,
  removeContactFromGroupService,
  updateOneContactService,
} from "./contacts.services.factories";

export const adminContactsController = new AdminContactsController(
  getAllContactsService,
  getContactByIdService,
  createOneContactService,
  updateOneContactService,
  deleteOneContactService,
  getContactsByGroupsService,
  addContactToGroupService,
  removeContactFromGroupService,
  new UsersRepository(),
);
