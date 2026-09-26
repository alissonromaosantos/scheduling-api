import { Request, Response, NextFunction } from "express";
import { GetAllContactsService } from '../services/get-all.service';
import type { Contact } from "../types/contact.type";

export class GetAllContactsController {
  constructor(private readonly getAllContactsService: GetAllContactsService) {}

  getAll = async (
    request: Request, 
    response: Response, 
    next: NextFunction
  ) => {
    try {
      const contacts: Contact[] = await this.getAllContactsService.getAll(request.user!.id);

      return response.status(200).json({ contacts });
    } catch(error) {
      next(error);
    }
  }
}