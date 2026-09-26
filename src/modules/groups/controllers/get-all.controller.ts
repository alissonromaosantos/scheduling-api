import { Request, Response, NextFunction } from "express";
import { GetAllGroupsService } from "../services/get-all.service";
import type { Group } from "../types/group.type";

export class GetAllGroupsController {
  constructor(private readonly getAllGroupsService: GetAllGroupsService) {}

  getAll = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const groups: Group[] = await this.getAllGroupsService.getAll(request.user!.id);

      return response.status(200).json({ groups });
    } catch (error) {
      next(error);
    }
  };
}
