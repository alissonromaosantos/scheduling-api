import type { NextFunction, Request, Response } from "express";
import type { AddContactToGroupService } from "../services/add-contact-to-group.service";

export class AddContactToGroupController {
  constructor(
    private readonly addContactToGroupService: AddContactToGroupService,
  ) {}

  add = async (request: Request, response: Response, next: NextFunction) => {
    try {
      await this.addContactToGroupService.add(request.body, request.user!.id);
      return response
        .status(201)
        .json({ message: "Contato adicionado ao grupo com sucesso!" });
    } catch (error) {
      next(error);
    }
  };
}
