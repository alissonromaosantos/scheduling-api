import type { NextFunction, Request, Response } from "express";
import type { AddContactToGroupService } from "../services/add-contact-to-group.service";
import type { CreateOneContactService } from "../services/create-one.service";
import type { DeleteOneContactService } from "../services/delete-one.service";
import type { GetAllContactsService } from "../services/get-all.service";
import type { GetContactsByGroupsService } from "../services/get-by-groups.service";
import type { GetContactByIdService } from "../services/get-by-id.service";
import type { RemoveContactFromGroupService } from "../services/remove-contact-from-group.service";
import type { UpdateOneContactService } from "../services/update-one.service";
import type { CreateContactDTO } from "../dto/create-contact.dto";
import type { UpdateContactDTO } from "../dto/update-contact.dto";
import type { AddContactToGroupDTO } from "../dto/add-contact-to-group.dto";
import type { UUID } from "node:crypto";
import { AppError } from "../../../shared/errors/app-error";
import type { UsersRepository } from "../../users/repositories/users.repository";

export class AdminContactsController {
  constructor(
    private readonly getAllContacts: GetAllContactsService,
    private readonly getContactById: GetContactByIdService,
    private readonly createContact: CreateOneContactService,
    private readonly updateContact: UpdateOneContactService,
    private readonly deleteContact: DeleteOneContactService,
    private readonly getContactsByGroups: GetContactsByGroupsService,
    private readonly addContactToGroup: AddContactToGroupService,
    private readonly removeContactFromGroup: RemoveContactFromGroupService,
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
        .json({ contacts: await this.getAllContacts.getAll(userId) });
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
      const contact = await this.getContactById.getById(
        request.params.id as UUID,
      );
      response.status(200).json({ contact });
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
        .body as CreateContactDTO & { user_id: string };
      if (!(await this.usersRepository.getById(userId))) {
        throw new AppError(
          "Proprietário não encontrado.",
          404,
          "USER_NOT_FOUND",
        );
      }
      await this.createContact.createOne(data, userId);
      response.status(201).json({ message: "Contato cadastrado com sucesso!" });
    } catch (error) {
      next(error);
    }
  };

  update = async (request: Request, response: Response, next: NextFunction) => {
    try {
      await this.updateContact.updateOne(
        request.params.id as UUID,
        response.locals.validated.body as UpdateContactDTO,
      );
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  delete = async (request: Request, response: Response, next: NextFunction) => {
    try {
      await this.deleteContact.deleteOne(request.params.id as UUID);
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  getAllByGroups = async (
    _request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = response.locals.validated.query?.user_id as
        | string
        | undefined;
      const contacts = await this.getContactsByGroups.getAll(userId);
      response.status(200).json({ contacts });
    } catch (error) {
      next(error);
    }
  };

  addToGroup = async (
    _request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const { user_id: userId, ...data } = response.locals.validated
        .body as AddContactToGroupDTO & { user_id: string };
      await this.addContactToGroup.add(data, userId);
      response
        .status(201)
        .json({ message: "Contato adicionado ao grupo com sucesso!" });
    } catch (error) {
      next(error);
    }
  };

  removeFromGroup = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      await this.removeContactFromGroup.remove(
        {
          contact_id: request.params.contact_id as string,
          group_id: request.params.group_id as string,
        },
        undefined,
      );
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
