import { Request, Response, NextFunction } from "express";
import type { UpdateOneContactService } from "../services/update-one.service";
import type { UUID } from "crypto";

export class UpdateOneContactController {
  constructor(private readonly updateOneContactService: UpdateOneContactService) {}

  updateOne = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id as UUID;
      const data = request.body;
      
      await this.updateOneContactService.updateOne(id, data, request.user!.id);

      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}