import { AddContactToGroupService } from "../services/add-contact-to-group.service";
import { CreateOneContactService } from "../services/create-one.service";
import { DeleteOneContactService } from "../services/delete-one.service";
import { GetAllContactsService } from "../services/get-all.service";
import { GetContactsByGroupsService } from "../services/get-by-groups.service";
import { GetContactByIdService } from "../services/get-by-id.service";
import { RemoveContactFromGroupService } from "../services/remove-contact-from-group.service";
import { SearchContactByNameService } from "../services/search-by-name.service";
import { UpdateOneContactService } from "../services/update-one.service";
import {
  createOneContactRepository,
  deleteOneContactRepository,
  getAllContactsRepository,
  getContactsByGroupsRepository,
  getContactByIdRepository,
  searchContactByEmailRepository,
  searchContactByNameRepository,
  removeContactFromGroupRepository,
  updateOneContactRepository,
  addContactToGroupRepository,
} from "./contacts.repositories.factories";

export const getAllContactsService = new GetAllContactsService(
  getAllContactsRepository,
);
export const getContactsByGroupsService = new GetContactsByGroupsService(
  getContactsByGroupsRepository,
);
export const getContactByIdService = new GetContactByIdService(
  getContactByIdRepository,
);
export const searchContactByNameService = new SearchContactByNameService(
  searchContactByNameRepository,
);
export const createOneContactService = new CreateOneContactService(
  createOneContactRepository,
  searchContactByEmailRepository,
);
export const addContactToGroupService = new AddContactToGroupService(addContactToGroupRepository);
export const updateOneContactService = new UpdateOneContactService(
  updateOneContactRepository,
  searchContactByEmailRepository
);
export const deleteOneContactService = new DeleteOneContactService(
  deleteOneContactRepository,
);

export const removeContactFromGroupService =
  new RemoveContactFromGroupService(removeContactFromGroupRepository);
