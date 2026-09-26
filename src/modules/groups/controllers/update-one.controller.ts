import { Request, Response, NextFunction } from "express";
import type { UUID } from "crypto";
import type { UpdateOneGroupService } from "../services/update-one.service";

export class UpdateOneGroupController {
  constructor(private readonly updateOneGroupService: UpdateOneGroupService) {}

  updateOne = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id as UUID;
      const data = request.body;
      
      await this.updateOneGroupService.updateOne(id, data, request.user!.id);

      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
