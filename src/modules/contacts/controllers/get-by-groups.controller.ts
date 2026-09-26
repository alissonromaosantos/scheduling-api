import type { NextFunction, Request, Response } from "express";
import type { GetContactsByGroupsService } from "../services/get-by-groups.service";

export class GetContactsByGroupsController {
  constructor(
    private readonly getContactsByGroupsService: GetContactsByGroupsService,
  ) {}

  getAll = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const contacts = await this.getContactsByGroupsService.getAll(
        request.user!.id,
      );

      return response.status(200).json({ contacts });
    } catch (error) {
      next(error);
    }
  };
}
