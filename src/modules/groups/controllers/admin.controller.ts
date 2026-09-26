import type { NextFunction, Request, Response } from "express";
import type { CreateGroupDTO } from "../dto/create-group.dto";
import type { UpdateGroupDTO } from "../dto/update-group.dto";
import type { CreateOneGroupService } from "../services/create-one.service";
import type { DeleteOneGroupService } from "../services/delete-one.service";
import type { GetAllGroupsService } from "../services/get-all.service";
import type { GetGroupByIdService } from "../services/get-by-id.service";
import type { UpdateOneGroupService } from "../services/update-one.service";
import type { UUID } from "node:crypto";
import { AppError } from "../../../shared/errors/app-error";
import type { UsersRepository } from "../../users/repositories/users.repository";

export class AdminGroupsController {
  constructor(
    private readonly getAllGroups: GetAllGroupsService,
    private readonly getGroupById: GetGroupByIdService,
    private readonly createGroup: CreateOneGroupService,
    private readonly updateGroup: UpdateOneGroupService,
    private readonly deleteGroup: DeleteOneGroupService,
    private readonly usersRepository: UsersRepository,
  ) {}

  getAll = async (
    _request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = response.locals.validated.query?.user_id as
        | string
        | undefined;
      response
        .status(200)
        .json({ groups: await this.getAllGroups.getAll(userId) });
    } catch (error) {
      next(error);
    }
  };

  getById = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const group = await this.getGroupById.getById(request.params.id as UUID);
      response.status(200).json({ group });
    } catch (error) {
      next(error);
    }
  };

  create = async (
    _request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const { user_id: userId, ...data } = response.locals.validated
        .body as CreateGroupDTO & { user_id: string };
      if (!(await this.usersRepository.getById(userId))) {
        throw new AppError(
          "Proprietário não encontrado.",
          404,
          "USER_NOT_FOUND",
        );
      }
      await this.createGroup.createOne(data, userId);
      response.status(201).json({ message: "Grupo cadastrado com sucesso!" });
    } catch (error) {
      next(error);
    }
  };

  update = async (request: Request, response: Response, next: NextFunction) => {
    try {
      await this.updateGroup.updateOne(
        request.params.id as UUID,
        response.locals.validated.body as UpdateGroupDTO,
      );
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  delete = async (request: Request, response: Response, next: NextFunction) => {
    try {
      await this.deleteGroup.deleteOne(request.params.id as UUID);
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
