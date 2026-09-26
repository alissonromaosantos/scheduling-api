import { AddContactToGroupRepository } from "../repositories/add-contact-to-group.repository";
import { CreateOneContactRepository } from "../repositories/create-one.repository";
import { DeleteOneContactRepository } from "../repositories/delete-one.repository";
import { GetAllContactsRepository } from "../repositories/get-all.repository";
import { GetContactsByGroupsRepository } from "../repositories/get-by-groups.repository";
import { GetContactByIdRepository } from "../repositories/get-by-id.repository";
import { RemoveContactFromGroupRepository } from "../repositories/remove-contact-from-group.repository";
import { SearchContactByEmailRepository } from "../repositories/search-by-email.repository";
import { SearchContactByNameRepository } from "../repositories/search-by-name.repository";
import { UpdateOneContactRepository } from "../repositories/update-one.repository";

export const getAllContactsRepository = new GetAllContactsRepository();

export const getContactsByGroupsRepository =
  new GetContactsByGroupsRepository();

export const getContactByIdRepository = new GetContactByIdRepository();

export const searchContactByNameRepository =
  new SearchContactByNameRepository();

export const searchContactByEmailRepository =
  new SearchContactByEmailRepository();

export const createOneContactRepository = new CreateOneContactRepository();

export const addContactToGroupRepository = new AddContactToGroupRepository();

export const updateOneContactRepository = new UpdateOneContactRepository();

export const deleteOneContactRepository = new DeleteOneContactRepository();

export const removeContactFromGroupRepository =
  new RemoveContactFromGroupRepository();
