import { AdminGroupsController } from "../controllers/admin.controller";
import { UsersRepository } from "../../users/repositories/users.repository";
import {
  createOneGroupService,
  deleteOneGroupService,
  getAllGroupsService,
  getGroupByIdService,
  updateOneGroupService,
} from "./groups.services.factories";

export const adminGroupsController = new AdminGroupsController(
  getAllGroupsService,
  getGroupByIdService,
  createOneGroupService,
  updateOneGroupService,
  deleteOneGroupService,
  new UsersRepository(),
);
