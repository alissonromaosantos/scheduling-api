import { CreateOneGroupService } from "../services/create-one.service";
import { DeleteOneGroupService } from "../services/delete-one.service";
import { GetAllGroupsService } from "../services/get-all.service";
import { GetGroupByIdService } from "../services/get-by-id.service";
import { SearchGroupByNameService } from "../services/search-by-name.service";
import { UpdateOneGroupService } from "../services/update-one.service";
import {
  createOneGroupRepository,
  deleteOneGroupRepository,
  getAllGroupsRepository,
  getGroupByIdRepository,
  searchGroupByNameRepository,
  updateOneGroupRepository,
} from "./groups.repositories.factories";

export const getAllGroupsService = new GetAllGroupsService(
  getAllGroupsRepository,
);
export const getGroupByIdService = new GetGroupByIdService(
  getGroupByIdRepository,
);
export const searchGroupByNameService = new SearchGroupByNameService(
  searchGroupByNameRepository,
);
export const createOneGroupService = new CreateOneGroupService(
  createOneGroupRepository,
);
export const updateOneGroupService = new UpdateOneGroupService(
  updateOneGroupRepository,
);
export const deleteOneGroupService = new DeleteOneGroupService(
  deleteOneGroupRepository,
);
