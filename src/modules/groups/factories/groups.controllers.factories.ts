import { CreateOneGroupController } from "../controllers/create-one.controller";
import { DeleteOneGroupController } from "../controllers/delete-one.controller";
import { GetAllGroupsController } from "../controllers/get-all.controller";
import { GetGroupByIdController } from "../controllers/get-by-id.controller";
import { SearchGroupByNameController } from "../controllers/search-by-name.controller";
import { UpdateOneGroupController } from "../controllers/update-one.controller";
import {
  createOneGroupService,
  deleteOneGroupService,
  getAllGroupsService,
  getGroupByIdService,
  searchGroupByNameService,
  updateOneGroupService,
} from "./groups.services.factories";

export const getAllGroupsController = new GetAllGroupsController(
  getAllGroupsService,
);
export const getGroupByIdController = new GetGroupByIdController(
  getGroupByIdService,
);
export const searchGroupByNameController = new SearchGroupByNameController(
  searchGroupByNameService,
);
export const createOneGroupController = new CreateOneGroupController(
  createOneGroupService,
);
export const updateOneGroupController = new UpdateOneGroupController(
  updateOneGroupService,
);
export const deleteOneGroupController = new DeleteOneGroupController(
  deleteOneGroupService,
);