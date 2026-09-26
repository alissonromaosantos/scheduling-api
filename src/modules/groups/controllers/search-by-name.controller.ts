import { Request, Response, NextFunction } from "express";
import type { Group } from "../../../types";
import type { SearchGroupByNameService } from "../services/search-by-name.service";

export class SearchGroupByNameController {
  constructor(
    private readonly searchGroupByNameService: SearchGroupByNameService,
  ) {}

  searchByName = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const name = request.query.name as string;

      const groups: Group[] =
        await this.searchGroupByNameService.searchByName(name, request.user!.id);

      return response.status(200).json({ groups });
    } catch (error) {
      next(error);
    }
  };
}
