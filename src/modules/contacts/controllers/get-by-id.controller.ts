import { Request, Response, NextFunction } from "express";
import type { UUID } from "node:crypto";
import type { Contact } from "../types/contact.type";
import type { GetContactByIdService } from "../services/get-by-id.service";

export class GetContactByIdController {
  constructor(private readonly getContactByIdService: GetContactByIdService) {}

  getById = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id as UUID;

      const contact: Contact = await this.getContactByIdService.getById(id, request.user!.id);

      return response.status(200).json({ contact });
    } catch (error) {
      next(error);
    }
  };
}