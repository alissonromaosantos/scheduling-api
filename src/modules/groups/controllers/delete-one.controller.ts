import { Request, Response, NextFunction } from "express";
import type { UUID } from "crypto";
import type { DeleteOneGroupService } from "../services/delete-one.service";

export class DeleteOneGroupController {
  constructor(private readonly deleteOneGroupService: DeleteOneGroupService) {}

  deleteOne = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id as UUID;
      
      await this.deleteOneGroupService.deleteOne(id, request.user!.id);

      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
