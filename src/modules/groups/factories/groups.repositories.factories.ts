import { CreateOneGroupRepository } from "../repositories/create-one.repository";
import { DeleteOneGroupRepository } from "../repositories/delete-one.repository";
import { GetAllGroupsRepository } from "../repositories/get-all.repository";
import { GetGroupByIdRepository } from "../repositories/get-by-id.repository";
import { SearchGroupByNameRepository } from "../repositories/search-by-name.repository";
import { UpdateOneGroupRepository } from "../repositories/update-one.repository";

export const getAllGroupsRepository = new GetAllGroupsRepository();

export const getGroupByIdRepository = new GetGroupByIdRepository();

export const searchGroupByNameRepository =
  new SearchGroupByNameRepository();
  
export const createOneGroupRepository = new CreateOneGroupRepository();

export const updateOneGroupRepository = new UpdateOneGroupRepository();

export const deleteOneGroupRepository = new DeleteOneGroupRepository();
