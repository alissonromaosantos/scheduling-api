import { Request, Response, NextFunction } from "express";
import type { Contact } from "../types/contact.type";
import type { SearchContactByNameService } from "../services/search-by-name.service";

export class SearchContactByNameController {
  constructor(private readonly searchContactByNameService: SearchContactByNameService) {}

  searchByName = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const name = request.query.name as string;

      const contacts: Contact[] =
        await this.searchContactByNameService.searchByName(name, request.user!.id);

      return response.status(200).json({ contacts });
    } catch (error) {
      next(error);
    }
  };
}