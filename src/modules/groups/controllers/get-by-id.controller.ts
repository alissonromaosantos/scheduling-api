import { Request, Response, NextFunction } from "express";
import type { UUID } from "crypto";
import type { GetGroupByIdService } from "../services/get-by-id.service";
import type { Group } from "../../../types";

export class GetGroupByIdController {
  constructor(private readonly getGroupByIdService: GetGroupByIdService) {}

  getById = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const id = request.params.id as UUID;

      const group: Group = await this.getGroupByIdService.getById(id, request.user!.id);

      return response.status(200).json({ group });
    } catch (error) {
      next(error);
    }
  };
}
